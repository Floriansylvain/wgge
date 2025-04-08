import { WebGPUDeviceManager } from "../core/WebGPUDeviceManager.ts"
import { GPUTextureWrapper } from "../core/GPUTextureWrapper.ts"
import { GPUCommandEncoderWrapper } from "../core/GPUCommandEncoderWrapper.ts"
import shaderCode from "../assets/shaders/lambert.wgsl?raw"
import { Camera } from "../camera/Camera.ts"
import { FirstPersonCameraController } from "../camera/FirstPersonCameraController.ts"
import { CameraUniform } from "./CameraUniform.ts"
import { Mesh } from "./Mesh.ts"
import { SceneObject } from "../scene/SceneObject.ts"
import { Material } from "./Material.ts"
import { LightUniform } from "./LightUniform.ts"
import { Scene } from "../scene/Scene.ts"
import { DebugOverlay } from "../ui/debug/DebugOverlay.ts"
import { SurfaceManager } from "../core/SurfaceManager.ts"

export class Renderer {
	private depthTexture!: GPUTextureWrapper
	private camera = new Camera({ aspect: SurfaceManager.aspect })
	private cameraUniform = new CameraUniform()
	private lightUniform = new LightUniform()
	private scene = new Scene()
	private debugOverlay = new DebugOverlay()

	constructor() {
		this.resize(SurfaceManager.width, SurfaceManager.height)

		this.lightUniform.update([0.5, -1, -0.5], [1, 1, 1])
		const controller = new FirstPersonCameraController(this.camera)
		this.scene.attachCameraController(controller)

		const cubeMesh = Mesh.createCube()
		const material = new Material(shaderCode, [
			{
				arrayStride: 36,
				attributes: [
					{ shaderLocation: 0, offset: 0, format: "float32x3" },
					{ shaderLocation: 1, offset: 12, format: "float32x3" },
					{ shaderLocation: 2, offset: 24, format: "float32x3" },
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

	resize(width: number, height: number) {
		this.camera.aspect = width / height
		this.depthTexture = new GPUTextureWrapper(
			width,
			height,
			"depth24plus",
			GPUTextureUsage.RENDER_ATTACHMENT,
		)
		this.cameraUniform.update(this.camera.viewProjection)
	}

	render(deltaTime: number) {
		this.scene.update(deltaTime)
		this.cameraUniform.update(this.camera.viewProjection)

		const device = WebGPUDeviceManager.device
		const context = WebGPUDeviceManager.context
		const encoder = new GPUCommandEncoderWrapper(device, "MainRenderEncoder")
		const view = context.getCurrentTexture().createView()

		encoder.debugGroup("Frame")

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

		encoder.endCurrentPass()
		encoder.endDebugGroup()
		device.queue.submit([encoder.finish()])

		this.debugOverlay.update({
			fps: 1 / deltaTime,
			delta: deltaTime,
		})
	}
}
