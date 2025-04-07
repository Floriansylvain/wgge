import { WebGPUDeviceManager } from "./WebGPUDeviceManager.ts"
import { GPUTextureWrapper } from "./GPUTextureWrapper.ts"
import shaderCode from "../assets/shaders/triangle.wgsl?raw"
import { Camera } from "../camera/Camera.ts"
import { CameraUniform } from "./CameraUniform.ts"
import { Mesh } from "./Mesh.ts"
import { SceneObject } from "../scene/SceneObject.ts"
import { Material } from "./Material.ts"

export class Renderer {
	private depthTexture: GPUTextureWrapper

	private camera = new Camera()
	private cameraUniform = new CameraUniform()
	private angle = 0

	private sceneObjects: SceneObject[] = []

	constructor() {
		const canvas = WebGPUDeviceManager.context.canvas as HTMLCanvasElement
		const width = canvas.width
		const height = canvas.height

		this.camera.aspect = width / height
		this.cameraUniform.update(this.camera.viewProjection)

		this.depthTexture = new GPUTextureWrapper(
			width,
			height,
			"depth24plus",
			GPUTextureUsage.RENDER_ATTACHMENT,
		)

		const cubeMesh = Mesh.createCube()
		const material = new Material(shaderCode, [
			{
				arrayStride: 24,
				attributes: [
					{ shaderLocation: 0, offset: 0, format: "float32x3" },
					{ shaderLocation: 1, offset: 12, format: "float32x3" },
				],
			},
		])
		const cube = new SceneObject(
			cubeMesh,
			material,
			this.cameraUniform.buffer.buffer,
		)
		this.sceneObjects.push(cube)
	}

	render() {
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

		this.angle += 0.01
		for (const obj of this.sceneObjects) {
			obj.transform.reset()
			obj.transform.rotateY(this.angle)
			obj.updateModelMatrix()
			obj.draw(pass)
		}

		pass.end()
		device.queue.submit([encoder.finish()])
	}
}
