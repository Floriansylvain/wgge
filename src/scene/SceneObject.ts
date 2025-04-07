import { Transform } from "./Transform.ts"
import { Mesh } from "../gfx/Mesh.ts"
import { GPUBufferWrapper } from "../gfx/GPUBufferWrapper.ts"
import { WebGPUDeviceManager } from "../gfx/WebGPUDeviceManager.ts"
import { Material } from "../gfx/Material.ts"
import { NormalMatrix } from "../gfx/NormalMatrix.ts"

export class SceneObject {
	public readonly transform = new Transform()
	public readonly modelBuffer = new GPUBufferWrapper(
		64,
		GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
	)
	public readonly bindGroup: GPUBindGroup
	public readonly lightBindGroup: GPUBindGroup

	private readonly normalMatrix = new NormalMatrix()
	private readonly normalBuffer = new GPUBufferWrapper(
		48,
		GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
	)

	constructor(
		public readonly mesh: Mesh,
		private readonly material: Material,
		cameraBuffer: GPUBuffer,
		lightBuffer: GPUBuffer,
	) {
		this.bindGroup = WebGPUDeviceManager.device.createBindGroup({
			layout: material.getBindGroupLayout(0),
			entries: [
				{ binding: 0, resource: { buffer: cameraBuffer } },
				{ binding: 1, resource: { buffer: this.modelBuffer.buffer } },
				{ binding: 2, resource: { buffer: this.normalBuffer.buffer } },
			],
		})
		this.lightBindGroup = WebGPUDeviceManager.device.createBindGroup({
			layout: material.getBindGroupLayout(1),
			entries: [{ binding: 0, resource: { buffer: lightBuffer } }],
		})
	}

	updateModelMatrix() {
		const modelMat = this.transform.modelMatrix
		WebGPUDeviceManager.device.queue.writeBuffer(
			this.modelBuffer.buffer,
			0,
			new Float32Array(modelMat).buffer,
		)
		this.normalMatrix.updateFromModelMatrix(modelMat)
		WebGPUDeviceManager.device.queue.writeBuffer(
			this.normalBuffer.buffer,
			0,
			this.normalMatrix.toFloat32Array().buffer,
		)
	}

	draw(pass: GPURenderPassEncoder) {
		pass.setPipeline(this.material.pipeline)
		pass.setBindGroup(0, this.bindGroup)
		pass.setBindGroup(1, this.lightBindGroup)
		this.mesh.draw(pass)
	}
}
