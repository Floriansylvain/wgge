import { SceneObject } from "./SceneObject.ts"
import { FirstPersonCameraController } from "../camera/FirstPersonCameraController.ts"

export class Scene {
	private objects: SceneObject[] = []
	private time = 0
	private cameraController?: FirstPersonCameraController

	add(object: SceneObject) {
		this.objects.push(object)
	}

	attachCameraController(controller: FirstPersonCameraController) {
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
