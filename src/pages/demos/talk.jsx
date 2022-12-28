import { Canvas } from '@react-three/fiber'
import { Color, sRGBEncoding } from 'three'

export default function Viseme() {
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
          st.scene.background = new Color('#ffffff')
          st.gl.physicallyCorrectLights = true
          st.gl.outputEncoding = sRGBEncoding
        }}
      >
        <Content></Content>
        <gridHelper args={[100, 100, 0xff0000, 0xffff00]}></gridHelper>
        {/* <OverlayContentAdapter></OverlayContentAdapter> */}
      </Canvas>
    </div>
  )
}

function Content() {
  return <group></group>
}
