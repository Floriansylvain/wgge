export class WebGPUDeviceManager {
	static adapter: GPUAdapter
	static device: GPUDevice
	static queue: GPUQueue
	static context: GPUCanvasContext
	static format: GPUTextureFormat

	static async initialize(canvas: HTMLCanvasElement) {
		if (!navigator.gpu) throw new Error("WebGPU not supported")

		const adapter = await navigator.gpu.requestAdapter()
		if (!adapter) throw new Error("No suitable GPU adapter found")
		this.adapter = adapter

		this.device = await this.adapter.requestDevice()
		this.queue = this.device.queue

		this.context = canvas.getContext("webgpu") as GPUCanvasContext
		this.format = navigator.gpu.getPreferredCanvasFormat()

		this.context.configure({
			device: this.device,
			format: this.format,
			alphaMode: "opaque",
		})
	}
}
