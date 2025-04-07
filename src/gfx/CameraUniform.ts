import { GPUBufferWrapper } from "./GPUBufferWrapper.ts"
import { WebGPUDeviceManager } from "./WebGPUDeviceManager.ts"

export class CameraUniform {
	public readonly buffer: GPUBufferWrapper

	constructor() {
		this.buffer = new GPUBufferWrapper(
			64,
			GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
		)
	}

	update(matrix: Float32Array) {
		WebGPUDeviceManager.device.queue.writeBuffer(
			this.buffer.buffer,
			0,
			matrix.buffer,
		)
	}
}
