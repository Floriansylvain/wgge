import { mat4 } from "wgpu-matrix"

type vec3 = [number, number, number]

export class Camera {
	public position: vec3 = [0, 2, 5]
	public target: vec3 = [0, 0, 0]
	public up: vec3 = [0, 1, 0]

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
