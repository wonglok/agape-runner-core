import { useLoader } from '@react-three/fiber'
import { useMemo } from 'react'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { clone } from 'three/examples/jsm/utils/SkeletonUtils'

export function Servant() {
  let glb = useLoader(GLTFLoader, `/rpm/avatar/lok-dune.glb`, (loader) => {
    let draco = new DRACOLoader()
    draco.setDecoderPath(`/draco/`)
    loader.setDRACOLoader(draco)
  })
  let glbScene = useMemo(() => {
    return clone(glb.scene)
  }, [glb.scene])

  //
  return (
    <>
      <primitive object={glbScene}></primitive>
    </>
  )
}
