import { WebGPUDeviceManager } from "../core/WebGPUDeviceManager.ts"

export class Material {
	public readonly pipeline: GPURenderPipeline

	constructor(
		shaderCode: string,
		vertexLayout: GPUVertexBufferLayout[],
		layout: GPUPipelineLayout | "auto" = "auto",
	) {
		const device = WebGPUDeviceManager.device
		const format = WebGPUDeviceManager.format

		const shaderModule = device.createShaderModule({ code: shaderCode })

		this.pipeline = device.createRenderPipeline({
			layout,
			vertex: {
				module: shaderModule,
				entryPoint: "vs_main",
				buffers: vertexLayout,
			},
			fragment: {
				module: shaderModule,
				entryPoint: "fs_main",
				targets: [{ format }],
			},
			primitive: {
				topology: "triangle-list",
				cullMode: "back",
				frontFace: "ccw",
			},
			depthStencil: {
				depthWriteEnabled: true,
				depthCompare: "less",
				format: "depth24plus",
			},
		})
	}

	getBindGroupLayout(group: number = 0): GPUBindGroupLayout {
		return this.pipeline.getBindGroupLayout(group)
	}
}
