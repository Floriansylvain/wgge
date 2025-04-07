import { WebGPUDeviceManager } from "./core/WebGPUDeviceManager.ts"
import { Renderer } from "./render/Renderer.ts"
import { Clock } from "./core/Clock.ts"
import { Input } from "./core/Input.ts"

async function main() {
	const canvas = document.getElementById("gfx-canvas") as HTMLCanvasElement

	await WebGPUDeviceManager.initialize(canvas)

	const renderer = new Renderer()
	const clock = new Clock()

	Input.initialize(canvas)
	Input.lockMouse(canvas)

	function frame(now: number) {
		clock.update(now)
		Input.update(clock.deltaTime)
		renderer.render(clock.deltaTime)
		requestAnimationFrame(frame)
	}

	requestAnimationFrame(frame)
}

main().catch(console.error)
