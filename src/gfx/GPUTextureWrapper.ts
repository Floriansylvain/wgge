import { WebGPUDeviceManager } from "./WebGPUDeviceManager.ts"

export class GPUTextureWrapper {
	public readonly texture: GPUTexture
	public readonly view: GPUTextureView
	public readonly format: GPUTextureFormat

	constructor(
		width: number,
		height: number,
		format: GPUTextureFormat,
		usage: GPUTextureUsageFlags,
	) {
		const device = WebGPUDeviceManager.device

		this.format = format

		this.texture = device.createTexture({
			size: { width, height },
			format,
			usage,
		})

		this.view = this.texture.createView()
	}
}
