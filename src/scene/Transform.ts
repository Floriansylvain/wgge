import { mat4 } from "wgpu-matrix"

export class Transform {
	public modelMatrix = mat4.identity()

	public rotateY(rad: number) {
		this.modelMatrix = mat4.rotateY(this.modelMatrix, rad)
	}

	public rotateX(rad: number) {
		this.modelMatrix = mat4.rotateX(this.modelMatrix, rad)
	}

	public reset() {
		this.modelMatrix = mat4.identity()
	}
}
