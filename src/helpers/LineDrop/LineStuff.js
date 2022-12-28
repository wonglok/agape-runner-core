import {
  BoxBufferGeometry,
  DoubleSide,
  //
  // InstancedMesh,
  // PlaneBufferGeometry,
  FrontSide,
  InstancedBufferAttribute,
  InstancedBufferGeometry,
  Mesh,
  Object3D,
  ShaderMaterial,
  SphereBufferGeometry,
  Vector3,
} from 'three'
import anime from 'animejs'
import { GridHelper } from 'three140'
import { screenOpacity } from '../GLOverlayEffect.js'
// import { resample } from "@thi.ng/geom-resample";

export class LineStuff extends Object3D {
  constructor({
    position = new Vector3(),
    glb,
    baseGeometry = new SphereBufferGeometry(3, 64, 64),
  }) {
    super()
    let unitSize = 0.075
    let height = 4
    let pGeo = new BoxBufferGeometry(unitSize, height, unitSize, 1, 1, 1)

    let iGeo = new InstancedBufferGeometry()
    iGeo.copy(pGeo)

    let count = baseGeometry.attributes.position.array.length / 3
    iGeo.instanceCount = count

    iGeo.setAttribute(
      'offsets',
      new InstancedBufferAttribute(
        new Float32Array([...baseGeometry.attributes.position.array]),
        3
      )
    )

    iGeo.setAttribute(
      'rand3',
      new InstancedBufferAttribute(
        new Float32Array(
          [...baseGeometry.attributes.position.array].map((e) => Math.random())
        ),
        3
      )
    )

    let grid = new GridHelper(100, 100, 0xff0000, 0x00ffff)
    this.add(grid)

    let progress = { value: 0 }
    let iMat = new ShaderMaterial({
      uniforms: {
        unitSize: { value: unitSize },
        initHeight: { value: height },
        progress,
      },
      transparent: true,
      side: DoubleSide,
      vertexShader: require('./shaders/vlines.vert.js'),
      fragmentShader: require('./shaders/vlines.frag.js'),
    })

    let iMesh = new Mesh(iGeo, iMat)
    iMesh.frustumCulled = false

    iMesh.position.copy(position)
    this.add(iMesh)

    //
    let current = false
    let runner = ({
      startFadeOut = async () => {},
      done = () => {},
      delay = 0,
    }) => {
      progress.value = 0.0

      current = anime({
        targets: [progress],
        value: 1,
        easing: 'easeOutSine', //"easeOutQuad",
        duration: 2000,
        delay,
        complete: async () => {
          progress.value = 1

          done()

          // anime({
          //   targets: [progress],
          //   value: 0,
          //   easing: 'easeOutSine', //"easeOutQuad",
          //   duration: 1000,
          //   delay,
          //   update: () => {
          //     grid.position.y = 100 * (1.0 - progress.value)
          //   },
          //   complete: () => {
          //     startFadeOut()
          //     done()
          //   },
          // })
        },
      })
    }

    this.run = runner
    this.hide = () => {
      if (current) {
        current.pause()
      }
      // progress.value = 0.0
    }

    return this
  }
}
