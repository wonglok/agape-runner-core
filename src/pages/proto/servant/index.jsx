import { Servant } from '@/components/servant/Servant'
import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

export default function servant() {
  return (
    <div className='w-full h-full'>
      <Canvas>
        {/*  */}
        {/*  */}
        <group position={[0, 0, 0]}>
          <Servant></Servant>
          {/*  */}
          {/*  */}
        </group>
        <OrbitControls
          object-position={[0, 1.45, 3]}
          target={[0, 1.5, 0]}
        ></OrbitControls>
        <Environment preset='apartment' background blur={0.3}></Environment>
        {/*  */}
        {/*  */}
      </Canvas>
    </div>
  )
}
