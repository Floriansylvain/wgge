import { WebGPUDeviceManager } from "./WebGPUDeviceManager.ts"
import { GPUBufferWrapper } from "./GPUBufferWrapper.ts"
import { BasicPipeline } from "./pipelines/BasicPipeline.ts"
import shaderCode from "../assets/shaders/triangle.wgsl?raw"

export class Renderer {
	private pipeline: BasicPipeline
	private vertexBuffer: GPUBufferWrapper

	constructor() {
		this.pipeline = new BasicPipeline(shaderCode)

		const vertexData = new Float32Array([
			0.0, 0.5, 1.0, 0.0, 0.0, -0.5, -0.5, 0.0, 1.0, 0.0, 0.5, -0.5, 0.0, 0.0,
			1.0,
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
		})

		pass.setPipeline(this.pipeline.pipeline)
		pass.setVertexBuffer(0, this.vertexBuffer.buffer)
		pass.draw(3)
		pass.end()

		device.queue.submit([encoder.finish()])
	}
}
