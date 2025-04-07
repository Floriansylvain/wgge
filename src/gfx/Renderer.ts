import type { WebGPUContext } from "../core/initWebGPU.ts"

export class Renderer {
	constructor(private context: WebGPUContext) {}

	render() {
		const commandEncoder = this.context.device.createCommandEncoder()
		const textureView = this.context.context.getCurrentTexture().createView()
		const renderPass = commandEncoder.beginRenderPass({
			colorAttachments: [
				{
					view: textureView,
					clearValue: { r: 0.1, g: 0.1, b: 0.1, a: 1 },
					loadOp: "clear",
					storeOp: "store",
				},
			],
		})
		renderPass.end()

		this.context.device.queue.submit([commandEncoder.finish()])
	}
}
