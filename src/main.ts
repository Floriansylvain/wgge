import { WebGPUDeviceManager } from "./core/WebGPUDeviceManager.ts"
import { SurfaceManager } from "./core/SurfaceManager.ts"
import { Renderer } from "./render/Renderer.ts"
import { Clock } from "./core/Clock.ts"
import { Input } from "./core/Input.ts"

function setupInputIndicators(canvas: HTMLCanvasElement) {
	const keys = { W: false, A: false, S: false, D: false }
	const keyElements = {
		W: document.getElementById("key-W")!,
		A: document.getElementById("key-A")!,
		S: document.getElementById("key-S")!,
		D: document.getElementById("key-D")!,
	}
	const mousePoint = document.getElementById("mouse-point")!
	const mouseMovement = { x: 0, y: 0 }
	let inactivityTimeout: number | undefined

	window.addEventListener("keydown", (event) => {
		if (event.key.toUpperCase() in keys) {
			keys[event.key.toUpperCase() as keyof typeof keys] = true
			updateIndicators()
		}
	})
	window.addEventListener("keyup", (event) => {
		if (event.key.toUpperCase() in keys) {
			keys[event.key.toUpperCase() as keyof typeof keys] = false
			updateIndicators()
		}
	})
	canvas.addEventListener("mousemove", (event) => {
		mouseMovement.x += event.movementX
		mouseMovement.y += event.movementY
		mouseMovement.x = Math.max(-50, Math.min(50, mouseMovement.x))
		mouseMovement.y = Math.max(-50, Math.min(50, mouseMovement.y))

		if (inactivityTimeout) clearTimeout(inactivityTimeout)
		inactivityTimeout = window.setTimeout(() => {
			mouseMovement.x = 0
			mouseMovement.y = 0
			updateIndicators()
		}, 50)
		updateIndicators()
	})

	function updateIndicators() {
		for (const key in keys) {
			const element = keyElements[key as keyof typeof keys]
			element.style.backgroundColor = keys[key as keyof typeof keys]
				? "lime"
				: "transparent"
		}
		mousePoint.style.left = `${45 + mouseMovement.x}px`
		mousePoint.style.top = `${45 + mouseMovement.y}px`
	}
}

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

	setupInputIndicators(canvas)

	function frame(now: number) {
		const delta = clock.update(now)
		Input.update(delta)
		renderer.render(delta)
		requestAnimationFrame(frame)
	}

	requestAnimationFrame(frame)
}

main().catch(console.error)
