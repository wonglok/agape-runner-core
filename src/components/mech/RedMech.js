import { useAnimations, useGLTF } from '@react-three/drei'
import { useEffect } from 'react'
import { Color } from 'three140'

export function RedMech() {
  let glb = useGLTF(`/scene/mech-red/clean-512-compressed.glb`)
  let anim = useAnimations(glb.animations, glb.scene)

  useEffect(() => {
    anim.actions[anim.names[0]]?.play()

    glb.scene.traverse((it) => {
      it.frustumCulled = false

      if (it.material) {
        it.material.emissiveIntensity = 25
      }
    })
  })

  return (
    <group position={[0, 0, 0]} rotation={[0, 0, 0]} scale={3}>
      {/*  */}
      <pointLight
        color={'#0000cc'}
        position={[0, 2.5, 1]}
        intensity={1}
        decay={15}
      ></pointLight>
      <pointLight
        color={'#ffffff'}
        position={[0, 0, 1]}
        intensity={2}
      ></pointLight>
      <primitive object={glb.scene}></primitive>
    </group>
  )
}

//
