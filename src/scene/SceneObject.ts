import { Transform } from "./Transform.ts"
import { Mesh } from "../gfx/Mesh.ts"
import { GPUBufferWrapper } from "../gfx/GPUBufferWrapper.ts"
import { WebGPUDeviceManager } from "../gfx/WebGPUDeviceManager.ts"

export class SceneObject {
	public readonly transform = new Transform()
	public readonly modelBuffer = new GPUBufferWrapper(
		64,
		GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
	)
	public readonly bindGroup: GPUBindGroup

	constructor(
		public readonly mesh: Mesh,
		pipeline: GPURenderPipeline,
		cameraBuffer: GPUBuffer,
	) {
		this.bindGroup = WebGPUDeviceManager.device.createBindGroup({
			layout: pipeline.getBindGroupLayout(0),
			entries: [
				{ binding: 0, resource: { buffer: cameraBuffer } },
				{ binding: 1, resource: { buffer: this.modelBuffer.buffer } },
			],
		})
	}

	updateModelMatrix() {
		WebGPUDeviceManager.device.queue.writeBuffer(
			this.modelBuffer.buffer,
			0,
			new Float32Array(this.transform.modelMatrix).buffer,
		)
	}

	draw(pass: GPURenderPassEncoder) {
		pass.setBindGroup(0, this.bindGroup)
		this.mesh.draw(pass)
	}
}
