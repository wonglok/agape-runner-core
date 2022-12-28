import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber'
// import { Float, Preload, useFBO } from '@react-three/drei' //OrbitControls,
// import useStore from '@/helpers/store'
// import { useEffect, useRef } from 'react'
import {
  Camera,
  Color,
  DoubleSide,
  NormalBlending,
  Scene,
  sRGBEncoding,
  Vector3,
} from 'three'
// import { useMemo } from 'react'
// import { useSystemStore } from '@/helpers/useSystemStore'
import { Core } from '@/helpers/Core'
// import { ConfigCanvas } from '@/helpers/ConfigCanvas'

const LandingPage = ({ router, children }) => {
  return (
    <Canvas
      //
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
      }}
      {...{
        gl: { antialias: true, logarithmicDepthBuffer: false },
        onCreated: (st) => {
          st.events.connect(document.body)

          st.scene.background = new Color('#000000')
          st.gl.physicallyCorrectLights = true
          st.gl.outputEncoding = sRGBEncoding
          st.gl.shadowMap.enabled = false

          Core.now.canvas = Core.makeDisposableNode({ name: 'canvas' }).sub
          for (let kn in st) {
            Core.now.canvas.now[kn] = st[kn]
          }
          st.gl.setAnimationLoop(Core.work)
        },
      }}
      // gl={{ antialias: false, logarithmicDepthBuffer: true }}
      // onCreated={(st) => {
      //   st.scene.background = new Color('#ffffff')
      //   st.gl.physicallyCorrectLights = true
      //   st.gl.outputEncoding = sRGBEncoding

      //   Core.now.canvas = Core.makeDisposableNode({ name: 'canvas' }).sub
      //   for (let kn in st) {
      //     Core.now.canvas.now[kn] = st[kn]
      //   }
      // }}
    >
      {children}
    </Canvas>
  )
}

export { LandingPage }
