import { EffectNodeRuntime } from '@/effectnode/component/EffectNodeRuntime'
import { useGLTF } from '@react-three/drei'
// import { useFrame, useThree } from '@react-three/fiber'
import anime from 'animejs'
import { Children, useEffect, useMemo, useRef, useState } from 'react'
// import {
//   BoxBufferGeometry,
//   CircleBufferGeometry,
//   GridHelper,
//   SphereBufferGeometry,
//   Vector3,
// } from 'three'
// import { LineStuff } from './LineDrop/LineStuff'
// import { TheVortex } from '@/components/canvas/TheVortex/TheVortex'

import { screenOpacity } from './GLOverlayEffect'
import { useMultiverse } from './useMultiverse'
import { WalkerCam } from './collider/WalkerCamera'
import { TheVortex } from '@/components/canvas/TheVortex/TheVortex'

let ttt = 0
export function Floor({
  url,
  initPos = [0, 1.52, -5],
  lookAt = [0, 1, 0],
  mapDecors = () => null,
}) {
  let addNamedScene = useMultiverse((s) => s.addNamedScene)
  let setPosition = useMultiverse((s) => s.setPosition)
  let setupJoystick = useMultiverse((s) => s.setupJoystick)
  // let setPostProcessing = useMultiverse((s) => s.setPostProcessing)
  // let scene = useThree((s) => s.scene)
  // let gl = useThree((s) => s.gl)

  let glb = useGLTF(url)

  mapDecors({ mapScene: glb.scene })

  let [outCollider, setCollider] = useState(null)

  let prom = useMemo(() => {
    let prom = addNamedScene({ name: url, scene: glb.scene })
    return prom
  }, [addNamedScene, glb.scene, url])

  useEffect(() => {
    prom.then((it) => {
      setCollider(it)
    })
  }, [prom])

  useEffect(() => {
    setPosition({ initPos: initPos, lookAt: lookAt })

    prom.then(() => {
      setPosition({ initPos: initPos, lookAt: lookAt })
    })
    return () => {}
  }, [initPos, lookAt, prom, setPosition])

  useEffect(() => {
    return setupJoystick()
  }, [setupJoystick])

  useEffect(() => {
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
  }, [glb])

  return (
    <group>
      <group scale={0.01}>
        <theVortex></theVortex>
      </group>
      {outCollider && <WalkerCam collider={outCollider}></WalkerCam>}
      <primitive object={glb.scene}></primitive>
      {/* {glbFnc({ glb })} */}
      <EffectNodeRuntime key={url} glbObject={glb}></EffectNodeRuntime>
    </group>
  )
}
