// import { useLoader } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { clone } from 'three/examples/jsm/utils/SkeletonUtils'
import {
  createWorkerFactory,
  useWorker,
  createPlainWorkerFactory,
} from '@shopify/react-web-worker'
import { Box, Text } from '@react-three/drei'
import { Clock, Matrix4, Object3D } from 'three'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter'
import { importPackages } from './importPackages'

const createWorker = createWorkerFactory(() => {
  return Promise.resolve({
    //
    buildGLTF: async (input) => {
      let draco = new DRACOLoader()
      draco.setPath('/draco/')
      let loader = new GLTFLoader()
      loader.setDRACOLoader(draco)

      let glb = await loader.loadAsync(`/rpm/avatar/lok-groom.glb`)

      let newObject = new Object3D()

      newObject.add(glb.scene)
      //

      import(/* webpackIgnore: true */ '/api/script').then(({ getHappy }) => {
        //
        //
        let src = getHappy()
        //
        console.log(src)
      })

      //
      let exporter = new GLTFExporter()
      return await exporter.parseAsync(newObject, {
        binary: true,
        animations: glb.animations,
      })
    },
  })
})

//
export function Servant() {
  //
  const worker = useWorker(createWorker)
  //
  const [glbScene, setScene] = useState(() => {
    return <primitive object={new Object3D()}></primitive>
  })

  const [rawWorker] = useState(() => {
    return new Worker(`/api/worker`, {
      //
    })
  })

  let ref = useRef()
  return (
    <>
      {/*  */}
      {/*  */}
      {/*  */}
      <Text
        onClick={async () => {
          const buffer = await worker.buildGLTF()

          //
          setScene(null)
          let loader = new GLTFLoader()
          loader.parseAsync(buffer, '/').then((parsed) => {
            setScene(
              <group>
                <primitive object={parsed.scene}></primitive>
              </group>
            )
          })
          //
          //
        }}
      >
        yay
      </Text>

      {/*  */}
      {/*  */}
      <Text
        position={[0, 1, 0]}
        onClick={async () => {
          //
          //!SECTION
          //

          rawWorker.onmessage = (ev) => {
            console.log(ev.data)
          }
          rawWorker.postMessage(ref.current.matrix.toArray())
        }}
      >
        yay2
      </Text>

      <EffectNode></EffectNode>

      <group ref={ref}>
        <Box></Box>
        {glbScene}
      </group>
    </>
  )
}

//// import importShim from

// import { UserEndPoints } from '@/content-landing-page/LoginContentGate/GateConst'

export default function EffectNode() {
  useEffect(() => {
    importPackages([
      'nipple',
      // 'react-dom',
      'three',
      'three/examples/jsm/utils/SkeletonUtils.js',
    ]).then((result) => {
      //
      console.log(result)
    })
    // importShim()
  }, [])
  return <></>
}
