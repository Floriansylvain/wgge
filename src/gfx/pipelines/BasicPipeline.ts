import { WebGPUDeviceManager } from "../WebGPUDeviceManager.ts"

export class BasicPipeline {
	public readonly pipeline: GPURenderPipeline

	constructor(shaderCode: string) {
		const device = WebGPUDeviceManager.device

		const shaderModule = device.createShaderModule({ code: shaderCode })

		this.pipeline = device.createRenderPipeline({
			layout: "auto",
			vertex: {
				module: shaderModule,
				entryPoint: "vs_main",
				buffers: [
					{
						arrayStride: 20,
						attributes: [
							{ shaderLocation: 0, offset: 0, format: "float32x2" },
							{ shaderLocation: 1, offset: 8, format: "float32x3" },
						],
					},
				],
			},
			fragment: {
				module: shaderModule,
				entryPoint: "fs_main",
				targets: [{ format: WebGPUDeviceManager.format }],
			},
			primitive: {
				topology: "triangle-list",
				cullMode: "back",
			},
		})
	}
}
