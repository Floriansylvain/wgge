import { WebGPUDeviceManager } from "../core/WebGPUDeviceManager.ts"
import { GPUTextureWrapper } from "../core/GPUTextureWrapper.ts"
import shaderCode from "../assets/shaders/lambert.wgsl?raw"
import { Camera } from "../camera/Camera.ts"
import { CameraUniform } from "./CameraUniform.ts"
import { Mesh } from "./Mesh.ts"
import { SceneObject } from "../scene/SceneObject.ts"
import { Material } from "./Material.ts"
import { LightUniform } from "./LightUniform.ts"
import { Scene } from "../scene/Scene.ts"

export class Renderer {
	private depthTexture: GPUTextureWrapper
	private camera = new Camera()
	private cameraUniform = new CameraUniform()
	private lightUniform = new LightUniform()
	private scene = new Scene()

	constructor() {
		const canvas = WebGPUDeviceManager.context.canvas as HTMLCanvasElement
		const width = canvas.width
		const height = canvas.height

		this.camera.aspect = width / height
		this.cameraUniform.update(this.camera.viewProjection)
		this.lightUniform.update([0.5, -1, -0.5], [1, 1, 1])

		this.depthTexture = new GPUTextureWrapper(
			width,
			height,
			"depth24plus",
			GPUTextureUsage.RENDER_ATTACHMENT,
		)

		const cubeMesh = Mesh.createCube()
		const material = new Material(shaderCode, [
			{
				arrayStride: 36,
				attributes: [
					{ shaderLocation: 0, offset: 0, format: "float32x3" }, // pos
					{ shaderLocation: 1, offset: 12, format: "float32x3" }, // color
					{ shaderLocation: 2, offset: 24, format: "float32x3" }, // normal
				],
			},
		])
		const cube = new SceneObject(
			cubeMesh,
			material,
			this.cameraUniform.buffer.buffer,
			this.lightUniform.buffer.buffer,
		)
		this.scene.add(cube)
	}

	render(deltaTime: number) {
		this.scene.update(deltaTime)

		const device = WebGPUDeviceManager.device
		const context = WebGPUDeviceManager.context
		const encoder = device.createCommandEncoder()
		const view = context.getCurrentTexture().createView()

		const pass = encoder.beginRenderPass({
			colorAttachments: [
				{
					view,
					clearValue: { r: 0.1, g: 0.1, b: 0.1, a: 1 },
					loadOp: "clear",
					storeOp: "store",
				},
			],
			depthStencilAttachment: {
				view: this.depthTexture.view,
				depthClearValue: 1.0,
				depthLoadOp: "clear",
				depthStoreOp: "store",
			},
		})

		this.scene.render(pass)
		pass.end()
		device.queue.submit([encoder.finish()])
	}
}
