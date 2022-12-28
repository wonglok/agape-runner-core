import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { Color, Vector3 } from 'three'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
import { Line2 } from 'three/examples/jsm/lines/Line2'
import { getGeo } from './DraggingWire'

export function SingleWire({ link }) {
  const lineMat = useMemo(() => {
    const material = new LineMaterial({
      transparent: true,
      color: new Color('#00ffff'),
      linewidth: 0.0015,
      opacity: 0.8,
      dashed: true,
      vertexColors: true,
    })

    return material
  }, [])
  let works = useRef({})

  let scene = useThree((s) => s.scene)

  let mesh = useMemo(() => {
    let inputV3 = new Vector3()
    let outputV3 = new Vector3()

    let lineGeo = getGeo({ a: inputV3, b: outputV3 })

    const mesh = new Line2(lineGeo, lineMat)
    mesh.computeLineDistances()

    return mesh
  }, [])

  useEffect(() => {
    let inputV3 = new Vector3()
    let outputV3 = new Vector3()

    let sig = 0
    works.current.updateLine = () => {
      // docs _id
      let inputO3 = scene.getObjectByName(link.input._id)
      let outputO3 = scene.getObjectByName(link.output._id)

      if (inputO3 && outputO3) {
        inputO3.getWorldPosition(inputV3)
        outputO3.getWorldPosition(outputV3)

        if (sig !== inputV3.length() + outputV3.length()) {
          sig = inputV3.length() + outputV3.length()
          let lineGeo = getGeo({ a: inputV3, b: outputV3 })
          mesh.geometry = lineGeo
        }
      }
    }

    //
  }, [])

  useFrame(() => {
    Object.values(works.current).forEach((w) => w())
  })

  return (
    <group>
      <primitive object={mesh}></primitive>
    </group>
  )
}
