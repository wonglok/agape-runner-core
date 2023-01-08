// import { useLoader } from '@react-three/fiber'
import { useRef, useState } from 'react'
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
import { useThree } from '@react-three/fiber'

const createWorker = createWorkerFactory(() => {
  return Promise.resolve({
    //
    // shader

    processMatrix: ({ o3, dt }) => {
      let o3d = new Object3D()
      o3d.copy(o3)

      o3d.rotation.y += dt
      //
      return { o3: o3d }
    },

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
      {/*  */}
      {/*  */}
      <Text
        position={[0, 1, 0]}
        onClick={async () => {
          //

          rawWorker.onmessage = (ev) => {
            console.log(ev.data)
          }
          rawWorker.postMessage(ref.current.matrix.toArray())
        }}
      >
        yay2
      </Text>

      {/*  */}
      {/*  */}
      {/*  */}
      <Text
        position={[0, 2, 0]}
        onClick={async () => {
          //

          let clock = new Clock()

          let func = async () => {
            worker
              .processMatrix({
                o3: ref.current,
                dt: clock.getDelta(),
              })
              .then((res) => {
                let { o3 } = res
                ref.current.copy(o3)

                console.log(o3)

                requestAnimationFrame(() => {
                  func()
                })
              })
          }

          func()
        }}
      >
        yay3
      </Text>
      {/*  */}
      {/*  */}
      {/*  */}

      <group ref={ref}>
        <Box></Box>
        {glbScene}
      </group>
    </>
  )
}

//

//
