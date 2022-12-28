import { useGLBEditor } from '@/helpers/useGLBEditor'
import { Sphere } from '@react-three/drei'
import { createPortal, useFrame } from '@react-three/fiber'
import { useRef } from 'react'

export function AddItemCurosr() {
  let cursorMode = useGLBEditor((s) => s.cursorMode)
  let curosrPoint = useGLBEditor((s) => s.curosrPoint)
  let ref = useRef()
  useFrame((st, dt) => {
    if (ref.current) {
      ref.current.rotation.y += dt
    }
  })

  return (
    <group>
      {/*  */}

      {createPortal(
        <>
          <group visible={cursorMode === 'add'} ref={ref} position={[0, 2, 0]}>
            <Sphere scale={[1, 2, 1]} args={[1, 4, 2]}>
              <meshStandardMaterial
                metalness={1}
                roughness={0.3}
                color={'#ff0000'}
                flatShading={true}
              ></meshStandardMaterial>
            </Sphere>
          </group>
        </>,
        curosrPoint
      )}
      {/*  */}

      <primitive object={curosrPoint}></primitive>
      {/*  */}
    </group>
  )
}
