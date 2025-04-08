import { WebGPUDeviceManager } from "./core/WebGPUDeviceManager.ts"
import { SurfaceManager } from "./core/SurfaceManager.ts"
import { Renderer } from "./render/Renderer.ts"
import { Clock } from "./core/Clock.ts"
import { Input } from "./core/Input.ts"

async function main() {
	const canvas = document.getElementById("gfx-canvas") as HTMLCanvasElement

	await WebGPUDeviceManager.initialize(canvas)

	let renderer: Renderer
	const clock = new Clock()

	SurfaceManager.initialize(canvas, (width, height) => {
		renderer?.resize(width, height)
	})

	renderer = new Renderer()

	Input.initialize(canvas)
	Input.lockMouse(canvas)

	function frame(now: number) {
		const delta = clock.update(now)
		Input.update(delta)
		renderer.render(delta)
		requestAnimationFrame(frame)
	}

	requestAnimationFrame(frame)
}

main().catch(console.error)
