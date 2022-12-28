import { MyHands } from '@/components/Hands/MyHands/MyHands'
import { Core } from '@/helpers/Core'
import { Canvas } from '@react-three/fiber'
import { Color, sRGBEncoding } from 'three'

export default function Hands() {
  return (
    <div className='w-full h-full bg-white'>
      <Canvas
        style={{
          backgroundColor: 'white',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        gl={{ antialias: false, logarithmicDepthBuffer: true }}
        onCreated={(st) => {
          st.gl.physicallyCorrectLights = true
          st.gl.outputEncoding = sRGBEncoding

          Core.now.canvas = Core.makeDisposableNode({ name: 'core' }).sub

          for (let kn in st) {
            Core.now.canvas.now[kn] = st[kn]
          }
        }}
      >
        <Content></Content>
      </Canvas>
    </div>
  )
}

function Content() {
  return (
    <group>
      <MyHands></MyHands>
      {/* <gridHelper args={[100, 100, 0xff0000, 0xffff00]}></gridHelper> */}
    </group>
  )
}

//
