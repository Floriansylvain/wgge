import { initWebGPU } from "./core/initWebGPU.ts"
import { Renderer } from "./gfx/Renderer.ts"

async function main() {
	const canvas = document.getElementById("gfx-canvas") as HTMLCanvasElement

	const webgpu = await initWebGPU(canvas)
	const renderer = new Renderer(webgpu)

	function frame() {
		renderer.render()
		requestAnimationFrame(frame)
	}

	requestAnimationFrame(frame)
}

main().catch(console.error)
