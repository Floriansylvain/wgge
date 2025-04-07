export class Clock {
	private lastTime = performance.now()
	private _deltaTime = 0
	private _elapsed = 0

	update(now: number) {
		this._deltaTime = (now - this.lastTime) / 1000
		this._elapsed += this._deltaTime
		this.lastTime = now
	}

	get deltaTime(): number {
		return this._deltaTime
	}

	get elapsedTime(): number {
		return this._elapsed
	}

	reset() {
		this.lastTime = performance.now()
		this._deltaTime = 0
		this._elapsed = 0
	}
}
