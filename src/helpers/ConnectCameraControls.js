import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { OrbitControls } from 'three-stdlib'
import { useMultiverse } from './useMultiverse'

export function ConnectCameraControls() {
  let setCamera = useMultiverse((s) => s.setCamera)
  let setControls = useMultiverse((s) => s.setControls)
  let gl = useThree((s) => s.gl)
  let camera = useThree((s) => s.camera)

  let [or, setOR] = useState(false)
  useEffect(() => {
    let cleans = []
    let orbit = new OrbitControls(camera, gl.domElement)
    setCamera(camera)
    setControls(orbit)
    setOR(orbit)

    cleans.push(() => {
      orbit.enabled = false
      orbit.dispose()
    })
    return () => {
      cleans.forEach((s) => s())
    }
  }, [camera, gl, setCamera, setControls])

  useFrame(() => {
    if (or) {
      or.update()
    }
  })

  return null
}
