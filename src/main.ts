import { WebGPUDeviceManager } from "./gfx/WebGPUDeviceManager.ts"
import { Renderer } from "./gfx/Renderer.ts"

async function main() {
	const canvas = document.getElementById("gfx-canvas") as HTMLCanvasElement

	await WebGPUDeviceManager.initialize(canvas)

	const renderer = new Renderer()

	function frame() {
		renderer.render()
		requestAnimationFrame(frame)
	}

	requestAnimationFrame(frame)
}

main().catch(console.error)
