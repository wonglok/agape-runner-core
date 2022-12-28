import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { PointerLockControls } from 'three-stdlib'
import { UIContent } from './UIContent'
import { useMultiverse } from './useMultiverse'

export function ConnectPointerControls() {
  let setCamera = useMultiverse((s) => s.setCamera)
  let setControls = useMultiverse((s) => s.setControls)
  let gl = useThree((s) => s.gl)
  let camera = useThree((s) => s.camera)

  let [or, setOR] = useState(false)
  useEffect(() => {
    let cleans = []
    let orbit = new PointerLockControls(camera, gl.domElement)
    orbit.getAzimuthalAngle = () => {
      return camera.rotation.x
    }
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

  return <UIContent></UIContent>
}
