import { WebGPUDeviceManager } from "./WebGPUDeviceManager.ts"
import { GPUBufferWrapper } from "./GPUBufferWrapper.ts"
import { BasicPipeline } from "./pipelines/BasicPipeline.ts"
import { GPUTextureWrapper } from "./GPUTextureWrapper.ts"
import shaderCode from "../assets/shaders/triangle.wgsl?raw"

export class Renderer {
	private pipeline: BasicPipeline
	private vertexBuffer: GPUBufferWrapper
	private depthTexture: GPUTextureWrapper

	constructor() {
		const canvas = WebGPUDeviceManager.context.canvas as HTMLCanvasElement
		const width = canvas.width
		const height = canvas.height

		this.pipeline = new BasicPipeline(shaderCode)
		this.depthTexture = new GPUTextureWrapper(
			width,
			height,
			"depth24plus",
			GPUTextureUsage.RENDER_ATTACHMENT,
		)

		const vertexData = new Float32Array([
			// Triangle A (closer - RED)
			0.0, 0.5, 1.0, 0.0, 0.0, 0.2, -0.5, -0.5, 1.0, 0.0, 0.0, 0.2, 0.5, -0.5,
			1.0, 0.0, 0.0, 0.2,
			// Triangle B (further - GREEN)
			0.0, 0.5, 0.0, 1.0, 0.0, 0.8, -0.5, -0.5, 0.0, 1.0, 0.0, 0.8, 0.5, -0.5,
			0.0, 1.0, 0.0, 0.8,
		])

		this.vertexBuffer = new GPUBufferWrapper(vertexData, GPUBufferUsage.VERTEX)
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

		pass.setPipeline(this.pipeline.pipeline)
		pass.setVertexBuffer(0, this.vertexBuffer.buffer)
		pass.draw(3)
		pass.end()

		device.queue.submit([encoder.finish()])
	}
}
