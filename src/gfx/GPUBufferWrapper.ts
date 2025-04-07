import { WebGPUDeviceManager } from "./WebGPUDeviceManager.ts"

export class GPUBufferWrapper {
	public readonly buffer: GPUBuffer
	public readonly size: number
	public readonly usage: number

	constructor(
		dataOrSize: Float32Array | Uint32Array | number,
		usage: number,
		mappedAtCreation = false,
	) {
		const device = WebGPUDeviceManager.device

		if (typeof dataOrSize === "number") {
			this.size = dataOrSize
			this.usage = usage
			this.buffer = device.createBuffer({
				size: this.size,
				usage: this.usage,
				mappedAtCreation,
			})
		} else {
			this.size = dataOrSize.byteLength
			this.usage = usage | GPUBufferUsage.COPY_DST
			this.buffer = device.createBuffer({
				size: this.size,
				usage: this.usage,
				mappedAtCreation: false,
			})
			device.queue.writeBuffer(
				this.buffer,
				0,
				dataOrSize.buffer,
				dataOrSize.byteOffset,
				dataOrSize.byteLength,
			)
		}
	}

	destroy() {
		this.buffer.destroy()
	}
}
