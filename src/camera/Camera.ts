import { Mat4, mat4, Vec3, vec3 } from "wgpu-matrix"

export class Camera {
	public position: Vec3 = vec3.fromValues(0, 0, 5)

	public fov: number
	public near: number
	public far: number

	private _aspect: number
	private _projectionMatrix: Mat4 = mat4.identity()
	private _viewMatrix: Mat4 = mat4.identity()
	public viewProjection: Mat4 = mat4.create()

	constructor({
		fov = 70 * (Math.PI / 180),
		aspect = 16 / 9,
		near = 0.1,
		far = 100,
	}) {
		this.fov = fov
		this._aspect = aspect
		this.near = near
		this.far = far
		this.updateProjectionMatrix()
		this.updateViewProjectionMatrix()
	}

	get aspect(): number {
		return this._aspect
	}

	set aspect(value: number) {
		this._aspect = value
		this.updateProjectionMatrix()
	}

	get projectionMatrix(): Mat4 {
		return this._projectionMatrix
	}

	get viewMatrix(): Mat4 {
		return this._viewMatrix
	}

	set viewMatrix(matrix: Mat4) {
		this._viewMatrix = matrix
		this.updateViewProjectionMatrix()
	}

	private updateProjectionMatrix() {
		this._projectionMatrix = mat4.perspective(
			this.fov,
			this._aspect,
			this.near,
			this.far,
		)
	}

	private updateViewProjectionMatrix() {
		this.viewProjection = mat4.multiply(
			this._projectionMatrix,
			this._viewMatrix,
		)
	}
}
