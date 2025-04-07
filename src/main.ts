import { WebGPUDeviceManager } from "./gfx/WebGPUDeviceManager.ts"
import { Renderer } from "./gfx/Renderer.ts"
import { Clock } from "./gfx/Clock.ts"

async function main() {
	const canvas = document.getElementById("gfx-canvas") as HTMLCanvasElement

	await WebGPUDeviceManager.initialize(canvas)

	const renderer = new Renderer()
	const clock = new Clock()

	function frame(now: number) {
		clock.update(now)
		renderer.render(clock.deltaTime)
		requestAnimationFrame(frame)
	}

	requestAnimationFrame(frame)
}

main().catch(console.error)
