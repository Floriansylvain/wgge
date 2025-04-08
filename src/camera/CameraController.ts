import { Camera } from "./Camera.ts"

export abstract class CameraController {
	protected camera: Camera
	public enabled = true

	constructor(camera: Camera) {
		this.camera = camera
	}

	abstract update(deltaTime: number): void
}
