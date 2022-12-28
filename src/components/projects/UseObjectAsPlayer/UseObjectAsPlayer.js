import { EffectNodeRuntime } from '@/effectnode/component/EffectNodeRuntime'
import { useMultiverse } from '@/helpers/useMultiverse'
import { useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { clone } from 'three140/examples/jsm/utils/SkeletonUtils'

export function UseObjectAsPlayer({ glbObject }) {
  let ref = useRef()

  //
  let player = useMultiverse((s) => s.player)
  let cloned = clone(glbObject.scene)
  let anim = useAnimations(glbObject.animations, cloned)

  //
  useEffect(() => {
    console.log(anim.names)
  })

  //
  useFrame((st, dt) => {
    if (ref.current) {
      ref.current.position.copy(player.position)
      ref.current.position.y -= 1.52
      ref.current.quaternion.copy(player.quaternion)
    }
  })

  //
  return (
    <group ref={ref}>
      <group rotation={[0, Math.PI, 0]}>
        <primitive key={cloned.uuid} object={cloned} />
        <EffectNodeRuntime
          glbObject={{ scene: cloned, animations: glbObject.animations }}
        ></EffectNodeRuntime>
      </group>
    </group>
  )
}

//
//
//

//
//
//

//
