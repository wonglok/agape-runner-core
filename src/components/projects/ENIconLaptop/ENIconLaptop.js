import { useGLTF } from '@react-three/drei'
import { Suspense } from 'react'

export function ENIconLaptop() {
  return (
    <group>
      {/*  */}
      <Suspense fallback={null}>
        <ENIconLaptopIntenral></ENIconLaptopIntenral>
      </Suspense>
      {/*  */}
    </group>
  )
}

function ENIconLaptopIntenral() {
  // let glb = useGLTF(``)
  return <group>{/* <primitive object={glb.scene}></primitive> */}</group>
}
