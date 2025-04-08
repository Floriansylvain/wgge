export class SurfaceManager {
	private static canvas: HTMLCanvasElement
	private static resizeCallback?: (width: number, height: number) => void

	static initialize(
		canvas: HTMLCanvasElement,
		onResize?: (w: number, h: number) => void,
	) {
		this.canvas = canvas
		this.resizeCallback = onResize
		this.syncSize()

		window.addEventListener("resize", () => this.syncSize())
	}

	static syncSize() {
		const width = this.canvas.clientWidth
		const height = this.canvas.clientHeight

		if (this.canvas.width !== width || this.canvas.height !== height) {
			this.canvas.width = width
			this.canvas.height = height
			this.resizeCallback?.(width, height)
		}
	}

	static get width() {
		return this.canvas.width
	}

	static get height() {
		return this.canvas.height
	}

	static get aspect() {
		return this.canvas.width / this.canvas.height
	}
}
