import { EffectNodeRuntime } from '@/effectnode/component/EffectNodeRuntime'
import { PostProcCallers } from '@/effectnode/component/PostProcCallers'
import { screenOpacity } from '@/helpers/GLOverlayEffect'
import { UIContent } from '@/helpers/UIContent'
import { useMultiverse } from '@/helpers/useMultiverse'
import { Environment, useGLTF } from '@react-three/drei'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import anime from 'animejs'
import { Children, useEffect, useRef, useState } from 'react'
import {
  AnimationAction,
  AnimationMixer,
  EquirectangularReflectionMapping,
} from 'three'
import { PointerLockControls } from 'three-stdlib'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

export function GameFloor({
  children,
  glbURL = `/scene/newyork/NYC_Expo_30.glb`,
}) {
  let glb = useGLTF(glbURL)

  let addNamedScene = useMultiverse((s) => s.addNamedScene)
  let [outletRneder, setRender] = useState(null)
  let [mixer] = useState((s) => new AnimationMixer())
  useFrame((s, dt) => {
    mixer.update(dt)
  })

  useEffect(() => {
    //
    glb.animations.forEach((ani) => {
      //
      let act = mixer.clipAction(ani, glb.scene)

      act.play()
    })

    let prom = addNamedScene({ name: glbURL, scene: glb.scene })

    // setPostProcessing(false)
    prom.then((it) => {
      // geo.scale(1, 0.01, 1)

      glb.scene.visible = false

      let applyGLB = (v) => {
        if (glb) {
          if (v === 0) {
            glb.scene.visible = false
          } else {
            glb.scene.visible = true
          }
          glb.scene.traverse((it) => {
            if (it.material) {
              it.material.transparent = true
              it.material.opacity = v
            }
          })
        }
      }

      screenOpacity.value = 0
      anime({
        targets: [screenOpacity],
        value: 1,
        duration: 7000,
        update: () => {
          applyGLB(screenOpacity.value)
        },
      })

      // glb.scene.traverse((it) => {
      //   if (it.isLight) {
      //     it.castShadow = true
      //   }
      //   it.castShadow = true
      //   it.receiveShadow = true
      // })

      setTimeout(() => {
        setRender(<primitive object={glb.scene}></primitive>)
      })
    })
    return () => {}
  }, [addNamedScene, glb, glbURL])

  return (
    <group>
      {outletRneder}

      {outletRneder && <>{children}</>}
      <EffectNodeRuntime glbObject={glb}></EffectNodeRuntime>
      {/* {enablePostProcessing && <PostProcCallers></PostProcCallers>} */}
    </group>
  )
}

//
//
//
