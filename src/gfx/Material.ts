import { WebGPUDeviceManager } from "./WebGPUDeviceManager.ts"

export class Material {
	public readonly pipeline: GPURenderPipeline

	constructor(shaderCode: string, vertexLayout: GPUVertexBufferLayout[]) {
		const device = WebGPUDeviceManager.device
		const format = WebGPUDeviceManager.format

		const shaderModule = device.createShaderModule({ code: shaderCode })

		this.pipeline = device.createRenderPipeline({
			layout: "auto",
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
			},
			depthStencil: {
				depthWriteEnabled: true,
				depthCompare: "less",
				format: "depth24plus",
			},
		})
	}

	getBindGroupLayout(): GPUBindGroupLayout {
		return this.pipeline.getBindGroupLayout(0)
	}
}
