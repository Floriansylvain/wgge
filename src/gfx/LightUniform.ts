import { WebGPUDeviceManager } from "./WebGPUDeviceManager.ts"
import { GPUBufferWrapper } from "./GPUBufferWrapper.ts"

export class LightUniform {
	public readonly buffer: GPUBufferWrapper

	constructor() {
		// 2x vec3<f32> → 6 floats → 6 * 4 = 24 bytes → round to 32 for alignment
		this.buffer = new GPUBufferWrapper(
			32,
			GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
		)
	}

	update(direction: [number, number, number], color: [number, number, number]) {
		const data = new Float32Array([
			...direction,
			0, // padding
			...color,
			0, // padding
		])
		WebGPUDeviceManager.device.queue.writeBuffer(
			this.buffer.buffer,
			0,
			data.buffer,
		)
	}
}
