import { initWebGPU } from "./core/initWebGPU.ts"

async function main() {
	const canvas = document.getElementById("gfx-canvas") as HTMLCanvasElement
	if (!canvas) {
		throw new Error("Canvas element not found.")
	}

	const { device, context, format } = await initWebGPU(canvas)

	console.log("WebGPU initialized", { device, context, format })
}

main().catch(console.error)
