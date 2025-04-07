import { Camera } from "../camera/Camera.ts"
import { Input } from "../core/Input.ts"
import { vec3, mat4, Vec3 } from "wgpu-matrix"

export class FirstPersonCameraController {
	private readonly moveSpeed = 5
	private readonly lookSpeed = 1
	private pitch = 0
	private yaw = -Math.PI / 2

	constructor(private readonly camera: Camera) {}

	update(dt: number) {
		const delta = Input.getMouseDelta()
		this.yaw += delta.x * this.lookSpeed
		this.pitch -= delta.y * this.lookSpeed

		this.pitch = Math.max(
			-Math.PI / 2 + 0.01,
			Math.min(Math.PI / 2 - 0.01, this.pitch),
		)

		const forward = [
			Math.cos(this.pitch) * Math.cos(this.yaw),
			Math.sin(this.pitch),
			Math.cos(this.pitch) * Math.sin(this.yaw),
		]

		const right: Vec3 = vec3.normalize(vec3.cross(forward, [0, 1, 0]))
		const up: Vec3 = vec3.cross(right, forward)

		let movement = vec3.create()
		if (Input.isKeyDown("KeyW")) movement = vec3.add(movement, forward)
		if (Input.isKeyDown("KeyS")) movement = vec3.subtract(movement, forward)
		if (Input.isKeyDown("KeyA")) movement = vec3.subtract(movement, right)
		if (Input.isKeyDown("KeyD")) movement = vec3.add(movement, right)

		movement = vec3.normalize(movement)
		movement = vec3.scale(movement, this.moveSpeed * dt)
		this.camera.position = vec3.add(this.camera.position, movement)

		const target = vec3.add(this.camera.position, forward)
		this.camera.viewMatrix = mat4.lookAt(this.camera.position, target, up)
		this.camera.updateViewProjectionMatrix()
	}
}
