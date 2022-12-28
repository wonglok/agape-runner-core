import { Suspense, useRef } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import {
  useGLTF,
  Environment,
  OrbitControls,
  CubeCamera,
  Sphere,
} from '@react-three/drei'
import { useTweaks } from 'use-tweaks'
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  Noise,
  SMAA,
} from '@react-three/postprocessing'
import { IcosahedronBufferGeometry } from 'three140'
import { generateUUID } from 'three/src/math/MathUtils'
import { EXRLoader } from 'three-stdlib'
import { RefractionMaterialYo } from './RefractionMaterialYo'

export function DiamondVAT() {
  return (
    <>
      <Canvas>
        <Suspense fallback={null}>
          <group position={[0, 0, 0]} rotation={[Math.PI * 0, 0, 0]}>
            <Load
              title='yo'
              color='#ffffff'
              axis={'z'}
              url={`/vat/bricks/rigid.glb`}
              geoQuery={(glb) => {
                return glb.scene.getObjectByName('export_mesh').geometry
              }}
            />
          </group>

          {/* <Sphere position={[5, 0, 0]}>
            <meshStandardMaterial
              emissive={'#ff94ff'}
              color={'green'}
            ></meshStandardMaterial>
          </Sphere>

          <Sphere position={[-5, 0, 0]}>
            <meshStandardMaterial
              emissive={'#ffc874'}
              color={'blue'}
            ></meshStandardMaterial>
          </Sphere> */}

          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />

          <Environment preset='warehouse' background></Environment>

          <EffectComposer multisampling={4}>
            <Bloom
              luminanceThreshold={2}
              intensity={1.5 * 0.1}
              levels={9}
              mipmapBlur={true}
            />
            <Noise premultiply={1} opacity={0.5}></Noise>
            {/* <ChromaticAberration
              offset={[0.0015, 0.0015]}
            ></ChromaticAberration> */}
          </EffectComposer>
        </Suspense>
        <OrbitControls
          object-position={[
            -0.938944768727402, 5.422066540446001, -3.571254399471269,
          ]}
          // object-position={}
          ref={(ref) => {
            // setInterval(() => {
            //   console.log(ref.object.position.toArray())
            // })
            // setInterval(() => {
            //   console.log(ref.object.position)
            // })
          }}
        ></OrbitControls>
      </Canvas>
    </>
  )
}

//

function Load({
  url = '/scene/diamond/sq2diamond.glb',
  geoQuery = () => {
    return new IcosahedronBufferGeometry(1, 0)
  },
  color = '#bababa',
  title = 'yoyo',
  axis = 'x',
}) {
  let offsets = useLoader(EXRLoader, `/vat/bricks/offsets.001.exr`)
  let normals = useLoader(EXRLoader, `/vat/bricks/normals.001.exr`)

  const sq2 = useGLTF(url)
  let geo = geoQuery(sq2)
  const ref = useRef()
  const config = useTweaks(title, {
    bounces: { value: 4, min: 0, max: 8, step: 1 },
    aberrationStrength: { value: 0.05, min: 0, max: 0.1, step: 0.01 },
    ior: { value: 2, min: 0, max: 10 },
    fresnel: { value: 0, min: 0, max: 1 },
    color: { value: color },
    autoRotate: true,
    fastChroma: true,
  })
  useFrame((_, delta) => {
    // console.log(_.camera.position.toArray())
    if (config.autoRotate) {
      ref.current.rotation[axis] += delta * 0.25 * 0.0
    }

    if (ref.current) {
      ref.current.material.progress += (delta / 60) * 24 * 0.25

      if (ref.current.material.progress >= 1.0) {
        ref.current.material.progress = 0.0
      }
    }
  })

  //
  return (
    <CubeCamera resolution={64} frames={1}>
      {(texture) => {
        return (
          <mesh ref={ref} geometry={geo}>
            {normals && offsets && (
              <RefractionMaterialYo
                key={generateUUID()}
                envMap={texture}
                normals={normals}
                offsets={offsets}
                {...config}
                toneMapped={false}
              />
            )}
          </mesh>
        )
      }}
    </CubeCamera>
  )
}
