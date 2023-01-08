// import { useLoader } from '@react-three/fiber'
import { useState } from 'react'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { clone } from 'three/examples/jsm/utils/SkeletonUtils'
import { createWorkerFactory, useWorker } from '@shopify/react-web-worker'
import { Text } from '@react-three/drei'
import { Object3D } from 'three'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter'

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

      import(/* webpackIgnore: true */ '/api/script').then(({ getHappy }) => {
        //
        let src = getHappy()

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

export function Servant() {
  //
  const worker = useWorker(createWorker)

  //
  const [glbScene, setScene] = useState(() => {
    return <primitive object={new Object3D()}></primitive>
  })

  return (
    <>
      <Text
        onClick={async () => {
          const buffer = await worker.buildGLTF()

          setScene(null)
          let loader = new GLTFLoader()
          loader.parseAsync(buffer, '/').then((parsed) => {
            setScene(<primitive object={parsed.scene}></primitive>)
          })
        }}
      >
        yay
      </Text>
      {glbScene}
    </>
  )
}
