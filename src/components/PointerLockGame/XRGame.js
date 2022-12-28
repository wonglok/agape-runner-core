import { ConnectKeyboard } from '@/helpers/ConnectKeyboard'
import { ConnectPointerControls } from '@/helpers/ConnectPointerControls'
import { ConnectSimulationPointer } from '@/helpers/ConnectSimulationPointer'
import { Player } from '@/helpers/Player'
import { Box, Text, useTexture } from '@react-three/drei'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Bloom, EffectComposer, SSR } from '@react-three/postprocessing'
import {
  Controllers,
  Hands,
  Interactive,
  useController,
  useXR,
  VRButton,
  XR,
} from '@react-three/xr'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import {
  Color,
  EquirectangularReflectionMapping,
  sRGBEncoding,
  Vector3,
} from 'three'
import { XRUserControls } from './XRUserControls'
// import { RGBE } from './RGBE'
import { ConnectSimulation } from '@/helpers/ConnectSimulation'
import { Floor } from '@/helpers/Floor'

export function XRGame() {
  let gameFloor = `/scene/journey/NYC_Expo_30.glb`
  gameFloor = `/scene/querlo/querlo-agape.glb`
  let rgbeURL = `/hdr/BROADWAY_LAFAYETTE_STATION_2.hdr`
  let bgPng = `/scene/querlo/ma-galaxy.jpeg`
  //
  return (
    <>
      <Canvas
        onCreated={(st) => {
          st.scene.background = new Color('#000000')
          st.camera.far = 3500
          st.camera.near = 1
          st.camera.updateProjectionMatrix()
        }}
      >
        <XR foveation={1}>
          {/*  */}
          <Suspense fallback={null}>
            <group>
              {/* <Box args={[2500, 2500, 2500]}>
                <meshStandardMaterial side={DoubleSide}></meshStandardMaterial>
              </Box> */}
              <ConnectKeyboard></ConnectKeyboard>
              {/* <RGBE rgbeURL={rgbeURL}></RGBE> */}
              <BG url={bgPng}></BG>
              <ConnectKeyboard></ConnectKeyboard>
              <ConnectSimulation></ConnectSimulation>
              <XRUserControls></XRUserControls>

              <group rotation-y={Math.PI * 1} position={[0, -2, 0]}>
                <Walker>
                  <Floor url={gameFloor}></Floor>
                </Walker>
              </group>
              <Player visible={false}></Player>
            </group>
          </Suspense>
          <Controllers
            hideRaysOnBlur={false}
            rayMaterial={{ color: 'white' }}
          />

          {/*  */}
        </XR>
      </Canvas>

      <VRButton enterOnly />
    </>
  )
}

function BG({ url }) {
  let tex = useTexture(url)
  tex.encoding = sRGBEncoding
  tex.mapping = EquirectangularReflectionMapping

  let scene = useThree((s) => s.scene)
  useEffect(() => {
    scene.environment = tex
    scene.background = tex
  }, [scene, tex])
  return (
    <>
      <directionalLight position={[0, 10, 10]}></directionalLight>
    </>
  )
}

function Walker({ children }) {
  let [ctrler, setCtrler] = useState(false)
  let player = useXR((s) => s.player)
  let session = useXR((s) => s.session)
  let pt = useMemo(() => {
    return new Vector3(0, 5, 0)
  }, [])

  let isDown = useRef(false)

  let temp = new Vector3()

  useFrame(({ camera }, dt) => {
    if (session) {
      player.position.lerp(pt, 0.1)
    } else {
    }

    if (isDown.current) {
      temp.set(0, 0, -1)

      //
      if (ctrler === lefctController) {
        temp.set(0, 0, 1)
      }
      if (ctrler === rightController) {
        temp.set(0, 0, -1)
      }

      //
      temp.applyQuaternion(camera.quaternion)

      pt.addScaledVector(temp, 10 * dt)
    }
  })

  // const leftController = useController('left')
  // console.log(leftController)

  const rightController = useController('right')
  const lefctController = useController('left')

  return (
    <group>
      <Interactive
        onSelectStart={(event) => {
          setCtrler(event.target)
          isDown.current = true
        }}
        onSelectEnd={(event) => {
          setCtrler(event.target)
          isDown.current = false
        }}
        onSelect={(event) => {
          //
          let target = event.intersection
          if (target) {
            // setCtrler(event.target)
            // pt.copy(target.point)
          }
        }}
      >
        {children}
      </Interactive>
    </group>
  )
}
