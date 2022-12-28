import { DynamicDrawUsage } from 'three'
import {
  BufferAttribute,
  Matrix3,
  Mesh,
  PerspectiveCamera,
  Vector3,
  WebGLRenderTarget,
} from 'three140'

export class GIMesh extends Mesh {
  copy(source) {
    super.copy(source)

    this.geometry = source.geometry.clone()

    return this
  }
}

export class GIRenderer {
  constructor(renderer, scene, giMesh) {
    const SIZE = 32,
      SIZE2 = SIZE * SIZE

    const camera = new PerspectiveCamera(90, 1, 0.01, 100)

    scene.updateMatrixWorld(true)

    let clone = scene.clone()
    clone.autoUpdate = false

    const rt = new WebGLRenderTarget(SIZE, SIZE)

    const normalMatrix = new Matrix3()

    const position = new Vector3()
    const normal = new Vector3()

    let bounces = 0
    let currentVertex = 0

    const color = new Float32Array(3)
    const buffer = new Uint8Array(SIZE2 * 4)

    function compute() {
      if (bounces === 4) return

      const object = giMesh // torusKnot
      const geometry = object.geometry

      const attributes = geometry.attributes
      const positions = attributes.position.array
      const normals = attributes.normal.array

      if (attributes.color === undefined) {
        const colors = new Float32Array(positions.length)
        geometry.setAttribute(
          'color',
          new BufferAttribute(colors, 3).setUsage(DynamicDrawUsage)
        )
      }

      const colors = attributes.color.array

      const startVertex = currentVertex
      const totalVertex = positions.length / 3

      for (let i = 0; i < 32; i++) {
        if (currentVertex >= totalVertex) break

        position.fromArray(positions, currentVertex * 3)
        position.applyMatrix4(object.matrixWorld)

        normal.fromArray(normals, currentVertex * 3)
        normal
          .applyMatrix3(normalMatrix.getNormalMatrix(object.matrixWorld))
          .normalize()

        camera.position.copy(position)
        camera.lookAt(position.add(normal))

        renderer.setRenderTarget(rt)
        renderer.render(clone, camera)

        renderer.readRenderTargetPixels(rt, 0, 0, SIZE, SIZE, buffer)

        color[0] = 0
        color[1] = 0
        color[2] = 0

        for (let k = 0, kl = buffer.length; k < kl; k += 4) {
          color[0] += buffer[k + 0]
          color[1] += buffer[k + 1]
          color[2] += buffer[k + 2]
        }

        let howManyTimesAdded = buffer.length
        colors[currentVertex * 3 + 0] = color[0] / (howManyTimesAdded * 255)
        colors[currentVertex * 3 + 1] = color[1] / (howManyTimesAdded * 255)
        colors[currentVertex * 3 + 2] = color[2] / (howManyTimesAdded * 255)

        currentVertex++
      }

      attributes.color.updateRange.offset = startVertex * 3
      attributes.color.updateRange.count = (currentVertex - startVertex) * 3
      attributes.color.needsUpdate = true

      if (currentVertex >= totalVertex) {
        clone = scene.clone()
        clone.autoUpdate = false

        bounces++
        currentVertex = 0
      }

      requestAnimationFrame(compute)
    }

    requestAnimationFrame(compute)
  }
}
