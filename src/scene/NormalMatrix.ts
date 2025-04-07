import { Mat3, mat3, Mat4 } from "wgpu-matrix"

export class NormalMatrix {
	public matrix: Mat3 = mat3.identity()

	updateFromModelMatrix(modelMatrix: Mat4) {
		let m = mat3.fromMat4(modelMatrix)
		m = mat3.inverse(m)
		this.matrix = mat3.transpose(m)
	}

	toFloat32Array(): Float32Array {
		return new Float32Array(this.matrix)
	}
}
