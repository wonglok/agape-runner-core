import { TheVortex } from '@/components/canvas/TheVortex/TheVortex'
import { EffectNodeRuntime } from '@/effectnode/component/EffectNodeRuntime'
import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import anime from 'animejs'
import { Children, useEffect, useRef, useState } from 'react'
import {
  BoxBufferGeometry,
  CircleBufferGeometry,
  GridHelper,
  SphereBufferGeometry,
  Vector3,
} from 'three'
// import { LineStuff } from './LineDrop/LineStuff'

import { screenOpacity } from './GLOverlayEffect'
import { useMultiverse } from './useMultiverse'

let ttt = 0
export function Floor({
  url,
  initPos = [0, 1.52, -5],
  lookAt = [0, 1, 0],
  mapDecors = () => null,
}) {
  let addNamedScene = useMultiverse((s) => s.addNamedScene)
  let setPosition = useMultiverse((s) => s.setPosition)
  // let setPostProcessing = useMultiverse((s) => s.setPostProcessing)
  let scene = useThree((s) => s.scene)
  let gl = useThree((s) => s.gl)
  let glb = useGLTF(url)
  mapDecors({ mapScene: glb.scene })

  let [outletRneder, setRender] = useState(null)

  //
  useEffect(() => {
    let prom = addNamedScene({ name: url, scene: glb.scene })

    // setPostProcessing(false)
    prom.then((it) => {
      // geo.scale(1, 0.01, 1)

      setPosition({ initPos: initPos, lookAt: lookAt })

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

      //
    })
    return () => {}
  }, [gl, glb, url, scene, addNamedScene])

  return (
    <group>
      {/* {glbFnc({ glb })} */}
      {outletRneder}
      <EffectNodeRuntime key={url} glbObject={glb}></EffectNodeRuntime>
    </group>
  )
}
