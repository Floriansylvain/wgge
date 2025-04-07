type KeyState = {
	pressed: boolean
	holdTime: number
}

export class Input {
	private static keys: Map<string, KeyState> = new Map()
	private static mouseDelta = { x: 0, y: 0 }
	private static mouseSensitivity = 0.002

	static initialize(target: HTMLElement = window.document.body) {
		window.addEventListener("keydown", (e) => {
			if (!this.keys.has(e.code)) {
				this.keys.set(e.code, { pressed: true, holdTime: 0 })
			}
		})

		window.addEventListener("keyup", (e) => {
			this.keys.delete(e.code)
		})

		target.addEventListener("mousemove", (e) => {
			this.mouseDelta.x += e.movementX
			this.mouseDelta.y += e.movementY
		})
	}

	static update(dt: number) {
		for (const key of this.keys.values()) {
			key.holdTime += dt
		}
	}

	static isKeyDown(code: string): boolean {
		return this.keys.has(code)
	}

	static getKeyHoldTime(code: string): number {
		return this.keys.get(code)?.holdTime ?? 0
	}

	static getMouseDelta(): { x: number; y: number } {
		const delta = {
			x: this.mouseDelta.x * this.mouseSensitivity,
			y: this.mouseDelta.y * this.mouseSensitivity,
		}
		this.mouseDelta.x = 0
		this.mouseDelta.y = 0
		return delta
	}

	static lockMouse(canvas: HTMLCanvasElement) {
		canvas.addEventListener("click", () => {
			canvas.requestPointerLock()
		})
	}
}
