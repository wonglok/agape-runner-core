import { useEffectNode } from '@/effectnode/store/useEffectNode'
import { Environment } from '@react-three/drei'
import { useLoader, useThree } from '@react-three/fiber'
import { Suspense, useEffect } from 'react'
import { EquirectangularReflectionMapping } from 'three140'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

export function EnvOutlet() {
  let hdrLink = useEffectNode((s) => s.hdrLink)
  let initHDR = useEffectNode((s) => s.initHDR)

  useEffect(() => {
    initHDR()
  }, [])

  //
  return (
    <group>
      {!hdrLink && (
        <Environment background preset='apartment' frames={1}></Environment>
      )}

      <Suspense fallback={null}>
        {hdrLink && <LoaderHDR url={hdrLink}></LoaderHDR>}
      </Suspense>
    </group>
  )
}

function LoaderHDR({ url }) {
  let scene = useThree((s) => s.scene)

  let textre = useLoader(RGBELoader, url)
  textre.mapping = EquirectangularReflectionMapping
  scene.environment = textre

  return null
}

//

//

//

//
