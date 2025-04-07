import { WebGPUDeviceManager } from "./WebGPUDeviceManager.ts"
import { GPUBufferWrapper } from "./GPUBufferWrapper.ts"
import { BasicPipeline } from "./pipelines/BasicPipeline.ts"
import { GPUTextureWrapper } from "./GPUTextureWrapper.ts"
import shaderCode from "../assets/shaders/triangle.wgsl?raw"
import { Camera } from "../camera/Camera.ts"
import { CameraUniform } from "./CameraUniform.ts"
import { Transform } from "../scene/Transform.ts"

export class Renderer {
	private pipeline: BasicPipeline
	private vertexBuffer: GPUBufferWrapper
	private depthTexture: GPUTextureWrapper

	private camera = new Camera()
	private cameraUniform = new CameraUniform()
	private bindGroup: GPUBindGroup

	private indexBuffer: GPUBufferWrapper
	private transform = new Transform()
	private modelBuffer = new GPUBufferWrapper(
		64,
		GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
	)
	private angle = 0

	constructor() {
		const canvas = WebGPUDeviceManager.context.canvas as HTMLCanvasElement
		const width = canvas.width
		const height = canvas.height

		this.camera.aspect = width / height
		this.cameraUniform.update(this.camera.viewProjection)

		this.pipeline = new BasicPipeline(shaderCode)
		this.depthTexture = new GPUTextureWrapper(
			width,
			height,
			"depth24plus",
			GPUTextureUsage.RENDER_ATTACHMENT,
		)
		this.bindGroup = WebGPUDeviceManager.device.createBindGroup({
			layout: this.pipeline.pipeline.getBindGroupLayout(0),
			entries: [
				{ binding: 0, resource: { buffer: this.cameraUniform.buffer.buffer } },
				{ binding: 1, resource: { buffer: this.modelBuffer.buffer } },
			],
		})

		// prettier-ignore
		const cubeVertices = new Float32Array([
			// x    y    z     r    g    b
			-1, -1,  1,   1, 0, 0,  // Front
			 1, -1,  1,   0, 1, 0,
			 1,  1,  1,   0, 0, 1,
			-1,  1,  1,   1, 1, 0,
			-1, -1, -1,   1, 0, 1,  // Back
			 1, -1, -1,   0, 1, 1,
			 1,  1, -1,   1, 1, 1,
			-1,  1, -1,   0, 0, 0,
		])

		// prettier-ignore
		const cubeIndices = new Uint16Array([
			0, 1, 2,  0, 2, 3,
			1, 5, 6,  1, 6, 2,
			5, 4, 7,  5, 7, 6,
			4, 0, 3,  4, 3, 7,
			3, 2, 6,  3, 6, 7,
			4, 5, 1,  4, 1, 0,
		])

		this.vertexBuffer = new GPUBufferWrapper(
			cubeVertices,
			GPUBufferUsage.VERTEX,
		)
		this.indexBuffer = new GPUBufferWrapper(cubeIndices, GPUBufferUsage.INDEX)
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

		this.angle += 0.02
		this.transform.reset()
		this.transform.rotateY(this.angle)

		device.queue.writeBuffer(
			this.modelBuffer.buffer,
			0,
			new Float32Array(this.transform.modelMatrix).buffer,
		)

		pass.setPipeline(this.pipeline.pipeline)
		pass.setBindGroup(0, this.bindGroup)
		pass.setVertexBuffer(0, this.vertexBuffer.buffer)
		pass.setIndexBuffer(this.indexBuffer.buffer, "uint16")
		pass.drawIndexed(36)
		pass.end()

		device.queue.submit([encoder.finish()])
	}
}
