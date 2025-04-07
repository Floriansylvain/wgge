import { GPUBufferWrapper } from "./GPUBufferWrapper.ts"

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
            // x    y    z     r    g    b
            -1, -1,  1,   1, 0, 0,
             1, -1,  1,   0, 1, 0,
             1,  1,  1,   0, 0, 1,
            -1,  1,  1,   1, 1, 0,
            -1, -1, -1,   1, 0, 1,
             1, -1, -1,   0, 1, 1,
             1,  1, -1,   1, 1, 1,
            -1,  1, -1,   0, 0, 0,
        ])

		// prettier-ignore
		const indices = new Uint16Array([
            0, 1, 2,  0, 2, 3,
            1, 5, 6,  1, 6, 2,
            5, 4, 7,  5, 7, 6,
            4, 0, 3,  4, 3, 7,
            3, 2, 6,  3, 6, 7,
            4, 5, 1,  4, 1, 0,
        ])

		return new Mesh(vertices, indices)
	}
}
