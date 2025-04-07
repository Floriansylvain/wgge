import { Mat4, mat4, Vec3, vec3 } from "wgpu-matrix"

export class Camera {
	public position: Vec3 = vec3.fromValues(0, 0, 5)
	public projectionMatrix: Mat4 = mat4.perspective(
		70 * (Math.PI / 180),
		16 / 9,
		0.1,
		100,
	)
	private _viewMatrix: Mat4 = mat4.identity()
	public viewProjection: Mat4 = mat4.create()
	public aspect: number = 1

	get viewMatrix(): Mat4 {
		return this._viewMatrix
	}

	set viewMatrix(matrix: Mat4) {
		this._viewMatrix = matrix
		this.updateViewProjectionMatrix()
	}

	updateViewProjectionMatrix() {
		this.viewProjection = mat4.multiply(this.projectionMatrix, this._viewMatrix)
	}

	updateProjectionMatrix(
		fov: number,
		aspect: number,
		near: number,
		far: number,
	) {
		this.aspect = aspect
		this.projectionMatrix = mat4.perspective(fov, aspect, near, far)
		this.updateViewProjectionMatrix()
	}
}
