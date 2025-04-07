export type WebGPUContext = {
	device: GPUDevice
	context: GPUCanvasContext
	format: GPUTextureFormat
}

export async function initWebGPU(
	canvas: HTMLCanvasElement,
): Promise<WebGPUContext> {
	if (!navigator.gpu) {
		throw new Error("WebGPU is not supported in this browser.")
	}

	const adapter = await navigator.gpu.requestAdapter()
	if (!adapter) throw new Error("Failed to get GPU adapter.")

	const device = await adapter.requestDevice()
	const context = canvas.getContext("webgpu") as GPUCanvasContext

	const format = navigator.gpu.getPreferredCanvasFormat()

	context.configure({
		device,
		format,
		alphaMode: "opaque",
	})

	return { device, context, format }
}
