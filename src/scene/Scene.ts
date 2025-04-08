import { SceneObject } from "./SceneObject.ts"
import { CameraController } from "../camera/CameraController.ts"

export class Scene {
	private objects: SceneObject[] = []
	private time = 0
	private cameraController?: CameraController

	add(object: SceneObject) {
		this.objects.push(object)
	}

	attachCameraController(controller: CameraController) {
		this.cameraController = controller
	}

	update(deltaTime: number) {
		this.time += deltaTime

		if (this.cameraController) {
			this.cameraController.update(deltaTime)
		}

		for (const obj of this.objects) {
			obj.transform.reset()
			obj.transform.rotateY(this.time)
			obj.transform.rotateX(this.time * 0.5)
			obj.updateModelMatrix()
		}
	}

	render(pass: GPURenderPassEncoder) {
		for (const obj of this.objects) {
			obj.draw(pass)
		}
	}

	getObjects(): readonly SceneObject[] {
		return this.objects
	}
}
