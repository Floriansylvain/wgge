export class DebugOverlay {
	private panel: HTMLDivElement
	private lastUpdateTime: number

	constructor() {
		this.panel = document.createElement("div")
		this.panel.id = "debug-overlay"
		this.panel.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.7);
            color: #0f0;
            font: 12px monospace;
            padding: 8px;
            z-index: 9999;
            pointer-events: none;
            white-space: pre;
        `
		document.body.appendChild(this.panel)
		this.lastUpdateTime = 0
	}

	update(data: { fps: number; delta: number }) {
		const now = performance.now()
		if (now - this.lastUpdateTime < 100) return
		this.lastUpdateTime = now

		this.panel.textContent =
			`FPS:   ${data.fps.toFixed(1)}\n` +
			`Delta: ${(data.delta * 1000).toFixed(2)}ms\n`
	}
}
