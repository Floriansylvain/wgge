export class Clock {
	private lastTime = performance.now()
	private _deltaTime = 0
	private _elapsed = 0
	private _frame = 0

	update(now: number): number {
		this._deltaTime = (now - this.lastTime) / 1000
		this._elapsed += this._deltaTime
		this.lastTime = now
		this._frame++
		return this._deltaTime
	}

	get deltaTime(): number {
		return this._deltaTime
	}

	get elapsed(): number {
		return this._elapsed
	}

	get frame(): number {
		return this._frame
	}
}
