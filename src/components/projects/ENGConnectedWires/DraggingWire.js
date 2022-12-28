import { useMemo, useRef } from 'react'
import { CatmullRomCurve3, Color, Vector3 } from 'three140'
import { LineSegmentsGeometry } from 'three140/examples/jsm/lines/LineSegmentsGeometry'
import { LineGeometry } from 'three140/examples/jsm/lines/LineGeometry'
import { LineMaterial } from 'three140/examples/jsm/lines/LineMaterial'
// import { LineGeometry } from "three140/examples/jsm/lines/LineGeometry";
import { Line2 } from 'three140/examples/jsm/lines/Line2'
import { useFrame } from '@react-three/fiber'
import { useGLBEditor } from '@/helpers/useGLBEditor'

//

export function DraggingWire() {
  let draggingIOID = useGLBEditor((s) => s.draggingIOID)
  let curosrPoint = useGLBEditor((s) => s.curosrPoint)
  let dragStartPos = useGLBEditor((s) => s.dragStartPos)
  let isDown = useGLBEditor((s) => s.isDown)
  // makeKeyReactive('draggingIOID')

  const lineMat = useMemo(() => {
    const material = new LineMaterial({
      transparent: true,
      color: new Color('#00ffff'),
      linewidth: 0.0015,
      opacity: 1.0,
      dashed: true,
      vertexColors: false,
    })

    return material
  }, [])

  let works = useRef({})

  let mesh = useMemo(() => {
    let cursorPos = new Vector3().copy(curosrPoint.position)
    cursorPos.set(1, 1, 1)

    let lineGeo = getGeo({ a: cursorPos, b: dragStartPos, dotted: true })

    const mesh = new Line2(lineGeo, lineMat)
    mesh.computeLineDistances()

    let needsUpdate = false
    works.current.updateLine = () => {
      if (
        isDown &&
        !(
          cursorPos.x === curosrPoint.position.x &&
          cursorPos.y === curosrPoint.position.y &&
          cursorPos.z === curosrPoint.position.z
        )
      ) {
        needsUpdate = true
      }
      cursorPos.copy(curosrPoint.position)

      if (needsUpdate) {
        //
        let lineGeo = getGeo({ a: cursorPos, b: dragStartPos, dotted: true })
        mesh.geometry = lineGeo
      }
    }

    return mesh
  })

  useFrame(() => {
    Object.values(works.current).forEach((w) => w())
  })

  return <group>{draggingIOID && <primitive object={mesh}></primitive>}</group>
}

export const getGeo = ({ a, b, dotted = false }) => {
  // const {
  //   LineSegmentsGeometry,
  // } = require('three/examples/jsm/lines/LineSegmentsGeometry')
  // const { LineGeometry } = require('three/examples/jsm/lines/LineGeometry')

  const dist = new Vector3().copy(a).distanceTo(b)
  let raise = dist / 8
  if (raise > 500) {
    raise = 500
  }

  let getDivA = (a, b) => {
    let val = new Vector3().lerpVectors(a, b, 0.25)

    val.y = a.y + raise - 1

    val.z = a.z

    return val
  }
  let getDivB = (a, b) => {
    let val = new Vector3().lerpVectors(a, b, 0.75)

    val.y = a.y + raise - 1

    val.z = b.z

    return val
  }

  // let getDivB = (a, b) => {
  //   let x = b.x
  //   let z = b.z
  //   if (a.x > b.x) {
  //     x += 20 * 1
  //   } else {
  //     x += 20 * -1
  //   }
  //   return new Vector3(x, a.y - 1 + raise, z)
  // }

  const curvePts = new CatmullRomCurve3(
    [
      new Vector3(a.x, a.y - 1, a.z),
      new Vector3(a.x, a.y - 1 + raise, a.z),

      getDivA(a, b),
      getDivB(a, b),

      new Vector3(b.x, b.y - 1 + raise, b.z),
      new Vector3(b.x, b.y - 1, b.z),
    ],
    false,
    'catmullrom',
    0.05
  )

  let lineGeo = new LineGeometry()
  if (dotted) {
    lineGeo = new LineSegmentsGeometry()
  }
  let colors = []
  let pos = []
  let count = 100
  let temp = new Vector3()

  let colorA = new Color()
  let colorB = new Color('#0000ff')

  for (let i = 0; i < count; i++) {
    curvePts.getPointAt((i / count) % 1, temp)
    if (isNaN(temp.x)) {
      temp.x = 0.0
    }
    if (isNaN(temp.y)) {
      temp.y = 0.0
    }
    if (isNaN(temp.z)) {
      temp.z = 0.0
    }
    pos.push(temp.x, temp.y, temp.z)
    colorA.setStyle('#00ff00')
    colorA.lerp(colorB, i / count)

    //
    colorA.offsetHSL(0, 0.5, 0.0)
    colors.push(colorA.r, colorA.g, colorA.b)
  }

  lineGeo.setColors(colors)

  lineGeo.setPositions(pos)
  return lineGeo
}
