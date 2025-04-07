import { mat4, vec3, Vec3 } from "wgpu-matrix"

export class Camera {
	public position: Vec3 = vec3.create(0, 2, 5)
	public target: Vec3 = vec3.create(0, 0, 0)
	public up: Vec3 = vec3.create(0, 1, 0)

	public fov = Math.PI / 3
	public aspect = 1
	public near = 0.1
	public far = 100

	get viewMatrix(): Float32Array {
		return mat4.lookAt(this.position, this.target, this.up)
	}

	get projectionMatrix(): Float32Array {
		return mat4.perspective(this.fov, this.aspect, this.near, this.far)
	}

	get viewProjection(): Float32Array {
		return mat4.multiply(this.projectionMatrix, this.viewMatrix)
	}
}
