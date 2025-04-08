export class GPUCommandEncoderWrapper {
	private encoder: GPUCommandEncoder
	private device: GPUDevice
	private currentPass: GPURenderPassEncoder | GPUComputePassEncoder | null =
		null
	private debugStack: string[] = []

	constructor(device: GPUDevice, label?: string) {
		this.device = device
		this.encoder = this.device.createCommandEncoder({ label })
		if (label) this.debugGroup(label)
	}

	debugGroup(label: string) {
		this.encoder.pushDebugGroup(label)
		this.debugStack.push(label)
	}

	endDebugGroup() {
		if (this.debugStack.length > 0) {
			this.encoder.popDebugGroup()
			this.debugStack.pop()
		}
	}

	beginRenderPass(desc: GPURenderPassDescriptor): GPURenderPassEncoder {
		this.endCurrentPass()
		const pass = this.encoder.beginRenderPass(desc)
		this.currentPass = pass
		return pass
	}

	beginComputePass(desc?: GPUComputePassDescriptor): GPUComputePassEncoder {
		this.endCurrentPass()
		const pass = this.encoder.beginComputePass(desc)
		this.currentPass = pass
		return pass
	}

	endCurrentPass() {
		if (!this.currentPass) return
		try {
			this.currentPass.end()
		} catch (e) {
			console.warn("Attempted to end an already-ended pass.", e)
		}
		this.currentPass = null
	}

	copyBufferToBuffer(
		source: GPUBuffer,
		sourceOffset: number,
		destination: GPUBuffer,
		destinationOffset: number,
		size: number,
	) {
		this.encoder.copyBufferToBuffer(
			source,
			sourceOffset,
			destination,
			destinationOffset,
			size,
		)
	}

	copyBufferToTexture(
		source: GPUTexelCopyBufferInfo,
		destination: GPUTexelCopyTextureInfo,
		copySize: GPUExtent3D,
	) {
		this.encoder.copyBufferToTexture(source, destination, copySize)
	}

	copyTextureToBuffer(
		source: GPUTexelCopyTextureInfo,
		destination: GPUTexelCopyBufferInfo,
		copySize: GPUExtent3D,
	) {
		this.encoder.copyTextureToBuffer(source, destination, copySize)
	}

	finish(): GPUCommandBuffer {
		this.endCurrentPass()
		while (this.debugStack.length > 0) this.endDebugGroup()
		return this.encoder.finish()
	}

	getEncoder(): GPUCommandEncoder {
		return this.encoder
	}
}
