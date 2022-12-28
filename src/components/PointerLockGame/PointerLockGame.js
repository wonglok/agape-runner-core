import { Companion } from '@/helpers/Companion'
import { ConnectKeyboard } from '@/helpers/ConnectKeyboard'
import { ConnectPointerControls } from '@/helpers/ConnectPointerControls'
import { ConnectSimulationPointer } from '@/helpers/ConnectSimulationPointer'
import { Player } from '@/helpers/Player'
import { Box } from '@react-three/drei'
import { Canvas, useLoader } from '@react-three/fiber'
import { Bloom, EffectComposer, SSR } from '@react-three/postprocessing'
import { Controllers, Hands, VRButton, XR } from '@react-three/xr'
import { Suspense } from 'react'
import { Color, DoubleSide } from 'three'
import { GameFloor } from './GameFloor'
import { PointerUserControls } from './PointerUserControls'
import { RGBE } from './RGBE'

export function PointerLockGame() {
  let gameFloor = `/scene/journey/NYC_Expo_30.glb`
  let rgbeURL = `/hdr/BROADWAY_LAFAYETTE_STATION_2.hdr`

  //
  return (
    <>
      <Canvas
        gl={{ depth: false }}
        onCreated={(st) => {
          st.scene.background = new Color('#000000')
          st.camera.far = 3500
          st.camera.near = 1
          st.camera.updateProjectionMatrix()
        }}
      >
        <EffectComposer multisampling={2}>
          <Bloom
            luminanceThreshold={0.5}
            radius={0.8}
            levels={5}
            mipmapBlur={true}
          ></Bloom>
        </EffectComposer>

        <Suspense fallback={null}>
          <group>
            <ConnectKeyboard></ConnectKeyboard>
            <ConnectPointerControls></ConnectPointerControls>
            <ConnectSimulationPointer></ConnectSimulationPointer>
            <Player visible={false}></Player>
            <PointerUserControls></PointerUserControls>

            <RGBE rgbeURL={rgbeURL}></RGBE>
            <GameFloor glbURL={gameFloor} enablePostProcessing={true}>
              <Companion
                frustumCulled={false}
                runActionName='sprint_forward'
                url={`/scene/landing/swat-mo-1024.glb`}
                speed={4}
              ></Companion>
            </GameFloor>
          </group>
        </Suspense>
      </Canvas>
    </>
  )
}
