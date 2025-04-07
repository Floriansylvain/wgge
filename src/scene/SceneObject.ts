import { Transform } from "./Transform.ts"
import { Mesh } from "../gfx/Mesh.ts"
import { GPUBufferWrapper } from "../gfx/GPUBufferWrapper.ts"
import { WebGPUDeviceManager } from "../gfx/WebGPUDeviceManager.ts"
import { Material } from "../gfx/Material.ts"

export class SceneObject {
	public readonly transform = new Transform()
	public readonly modelBuffer = new GPUBufferWrapper(
		64,
		GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
	)
	public readonly bindGroup: GPUBindGroup
	public readonly material: Material

	constructor(
		public readonly mesh: Mesh,
		material: Material,
		cameraBuffer: GPUBuffer,
	) {
		this.bindGroup = WebGPUDeviceManager.device.createBindGroup({
			layout: material.pipeline.getBindGroupLayout(0),
			entries: [
				{ binding: 0, resource: { buffer: cameraBuffer } },
				{ binding: 1, resource: { buffer: this.modelBuffer.buffer } },
			],
		})
		this.material = material
	}

	updateModelMatrix() {
		WebGPUDeviceManager.device.queue.writeBuffer(
			this.modelBuffer.buffer,
			0,
			new Float32Array(this.transform.modelMatrix).buffer,
		)
	}

	draw(pass: GPURenderPassEncoder) {
		pass.setPipeline(this.material.pipeline)
		pass.setBindGroup(0, this.bindGroup)
		this.mesh.draw(pass)
	}
}
