// import { useGLTF } from '@react-three/drei'
// import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { BoxBufferGeometry, Mesh } from 'three'
import { Scene } from 'three140'
import { useMultiverse } from './useMultiverse'

export function FloorFlat({ name = 'floor-editor' }) {
  let addNamedScene = useMultiverse((s) => s.addNamedScene)
  let setPostProcessing = useMultiverse((s) => s.setPostProcessing)
  let setPosition = useMultiverse((s) => s.setPosition)
  useEffect(() => {
    let myScene = new Scene()
    myScene.add(new Mesh(new BoxBufferGeometry(1000000, 0.1, 1000000)))
    let prom = addNamedScene({ name: name, scene: myScene })

    // // setPostProcessing(false)
    prom.then((it) => {
      // geo.scale(1, 0.01, 1)
      //
      setPosition({ initPos: [0, 5, 5], cameraOffset: [0, -3, 3] })
    })
    return () => {}
  }, [addNamedScene, setPosition, setPostProcessing, name])

  return (
    <group>
      {/*  */}

      <group>{/* <primitive object={glb.scene}></primitive> */}</group>

      {/*  */}
    </group>
  )
}
