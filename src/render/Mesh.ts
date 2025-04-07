import { GPUBufferWrapper } from "../core/GPUBufferWrapper.ts"

export class Mesh {
	public readonly vertexBuffer: GPUBufferWrapper
	public readonly indexBuffer: GPUBufferWrapper
	public readonly indexCount: number
	public readonly indexFormat: GPUIndexFormat

	constructor(vertexData: Float32Array, indexData: Uint16Array | Uint32Array) {
		this.vertexBuffer = new GPUBufferWrapper(vertexData, GPUBufferUsage.VERTEX)
		this.indexBuffer = new GPUBufferWrapper(indexData, GPUBufferUsage.INDEX)

		if (indexData instanceof Uint32Array) {
			this.indexFormat = "uint32"
		} else {
			this.indexFormat = "uint16"
		}

		this.indexCount = indexData.length
	}

	draw(pass: GPURenderPassEncoder) {
		pass.setVertexBuffer(0, this.vertexBuffer.buffer)
		pass.setIndexBuffer(this.indexBuffer.buffer, this.indexFormat)
		pass.drawIndexed(this.indexCount)
	}

	static createCube(): Mesh {
		// prettier-ignore
		const vertices = new Float32Array([
			// POS            COLOR         NORMAL
			// Front face
			-1, -1,  1,   1, 0, 0,   0, 0,  1,
			 1, -1,  1,   0, 1, 0,   0, 0,  1,
			 1,  1,  1,   0, 0, 1,   0, 0,  1,
			-1,  1,  1,   1, 1, 0,   0, 0,  1,
			// Back face
			-1, -1, -1,   1, 0, 1,   0, 0, -1,
			 1, -1, -1,   0, 1, 1,   0, 0, -1,
			 1,  1, -1,   1, 1, 1,   0, 0, -1,
			-1,  1, -1,   0, 0, 0,   0, 0, -1,
			// Top face
			-1,  1, -1,   1, 1, 0,   0, 1, 0,
			 1,  1, -1,   0, 1, 1,   0, 1, 0,
			 1,  1,  1,   0, 0, 1,   0, 1, 0,
			-1,  1,  1,   1, 0, 1,   0, 1, 0,
			// Bottom face
			-1, -1, -1,   1, 0, 0,   0, -1, 0,
			 1, -1, -1,   0, 1, 0,   0, -1, 0,
			 1, -1,  1,   0, 0, 1,   0, -1, 0,
			-1, -1,  1,   1, 1, 0,   0, -1, 0,
			// Right face
			 1, -1, -1,   1, 0, 0,   1, 0, 0,
			 1,  1, -1,   0, 1, 0,   1, 0, 0,
			 1,  1,  1,   0, 0, 1,   1, 0, 0,
			 1, -1,  1,   1, 1, 0,   1, 0, 0,
			// Left face
			-1, -1, -1,   1, 0, 1,  -1, 0, 0,
			-1,  1, -1,   0, 1, 1,  -1, 0, 0,
			-1,  1,  1,   1, 1, 1,  -1, 0, 0,
			-1, -1,  1,   0, 0, 0,  -1, 0, 0,
		])

		// prettier-ignore
		const indices = new Uint16Array([
			// Front face (+Z)
			0, 1, 2,  0, 2, 3,
			// Back face (-Z)
			6, 5, 4,  7, 6, 4,
			// Top face (+Y)
			8, 10, 9,  8, 11, 10,
			// Bottom face (-Y)
			12, 13, 14,  12, 14, 15,
			// Right face (+X)
			16,17,18,  16,18,19,
			// Left face (-X)
			22,21,20,  23,22,20,
		])

		return new Mesh(vertices, indices)
	}
}
