import React, { forwardRef, useEffect, useMemo, useRef } from 'react'
import { Effect } from 'postprocessing'
import { MathUtils, Uniform } from 'three'
import { BlendFunction } from 'postprocessing'
import { SSREffect } from 'screen-space-reflections'
// import * as POSTPROCESSING from 'postprocessing'
import { useFrame, useThree } from '@react-three/fiber'

import { defaultSSROptions } from 'screen-space-reflections'
import Pane from 'tweakpane'
import { Vector3 } from 'three140'
import { generateUUID } from 'three/src/math/MathUtils'

// const fragmentShader = `
// uniform float opacity;
// void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
// 	outputColor = vec4((opacity) * (inputColor.rgb), inputColor.a);
// }
// `

// Effect component
export const GLSSR = forwardRef(function ImplementationOfEffect({}, ref) {
  let scene = useThree((s) => s.scene)
  let camera = useThree((s) => s.camera)

  const effect = useMemo(() => {
    // const composer = new POSTPROCESSING.EffectComposer(renderer)

    let props = {
      intensity: 1,
      exponent: 1,
      distance: 10,
      fade: 0,
      roughnessFade: 0.9,
      thickness: 10,
      ior: 1.7,
      maxRoughness: 1,
      maxDepthDifference: 10,
      blend: 0.0,
      correction: false,
      correctionRadius: 0,
      blur: 0.0,
      blurKernel: 0,
      blurSharpness: 0,
      jitter: 0.005,
      jitterRoughness: 0,
      steps: 20,
      refineSteps: 1,
      missedRays: true,
      useNormalMap: true,
      useRoughnessMap: true,
      resolutionScale: 1,
      velocityResolutionScale: 0.1,
    }
    let arr = []

    for (let i = 0; i <= 1024; i++) {
      arr.push([0, 0])
    }

    const ssrEffect = new SSREffect(scene, camera, props)

    ssrEffect.haltonSequence = arr

    // if (process.env.NODE_ENV === 'development' && window.innerWidth >= 560) {
    //   new SSRDebugGUI(ssrEffect, props)
    // }

    // const ssrPass = new POSTPROCESSING.EffectPass(camera, ssrEffect)
    // composer.addPass(ssrPass)

    ssrEffect.i = 0
    return ssrEffect
  }, [camera, scene])
  //

  let nowPos = new Vector3()
  let diffPos = new Vector3()
  let lastPos = new Vector3()

  // GLSSR
  useFrame((st) => {
    let t = st.clock.getElapsedTime()
    st.camera.getWorldPosition(nowPos)
    let moveAmount = diffPos.copy(nowPos).sub(lastPos).length()
    lastPos.copy(nowPos)

    effect.jitter = MathUtils.lerp(effect.jitter, moveAmount * 0.1 + 0.01, 0.1)

    // effect.jitter = 0.0001 + moveAmount

    effect.fade = 0.01 + (Math.sin(t * 0.5) * 0.5 + 0.5 + 0.01) * 0.01

    effect.i++
  })
  return <primitive ref={ref} object={effect} />
})

GLSSR.key = generateUUID()
//

export class SSRDebugGUI {
  constructor(ssrEffect, params = defaultSSROptions) {
    //
    const pane = new Pane()
    this.pane = pane
    pane.containerElem_.style.userSelect = 'none'
    pane.containerElem_.style.width = '380px'
    pane.containerElem_.style.zIndex = '30000'

    pane.on('change', (ev) => {
      const { presetKey } = ev

      ssrEffect[presetKey] = ev.value
    })

    const generalFolder = pane.addFolder({ title: 'General' })
    generalFolder.addInput(params, 'intensity', { min: 0, max: 3, step: 0.01 })
    generalFolder.addInput(params, 'exponent', {
      min: 0.125,
      max: 8,
      step: 0.125,
    })
    generalFolder.addInput(params, 'distance', {
      min: 0.001,
      max: 10,
      step: 0.1,
    })
    generalFolder.addInput(params, 'fade', {
      min: 0,
      max: 20,
      step: 0.01,
    })
    generalFolder.addInput(params, 'roughnessFade', {
      min: 0,
      max: 1,
      step: 0.01,
    })
    generalFolder.addInput(params, 'thickness', {
      min: 0,
      max: 10,
      step: 0.01,
    })
    generalFolder.addInput(params, 'ior', {
      min: 1,
      max: 2.33333,
      step: 0.01,
    })

    const maximumValuesFolder = pane.addFolder({ title: 'Maximum Values' })
    maximumValuesFolder.addInput(params, 'maxRoughness', {
      min: 0,
      max: 1,
      step: 0.01,
    })
    maximumValuesFolder.addInput(params, 'maxDepthDifference', {
      min: 0,
      max: 100,
      step: 0.1,
    })

    const temporalResolveFolder = pane.addFolder({ title: 'Temporal Resolve' })

    temporalResolveFolder.addInput(params, 'blend', {
      min: 0,
      max: 1,
      step: 0.001,
    })
    temporalResolveFolder.addInput(params, 'correction', {
      min: 0,
      max: 1,
      step: 0.0001,
    })
    temporalResolveFolder.addInput(params, 'correctionRadius', {
      min: 1,
      max: 4,
      step: 1,
    })

    const blurFolder = pane.addFolder({ title: 'Blur' })
    blurFolder.addInput(params, 'blur', { min: 0, max: 1, step: 0.01 })
    blurFolder.addInput(params, 'blurKernel', { min: 0, max: 5, step: 1 })
    blurFolder.addInput(params, 'blurSharpness', { min: 0, max: 100, step: 1 })

    const jitterFolder = pane.addFolder({ title: 'Jitter' })

    jitterFolder.addInput(params, 'jitter', { min: 0, max: 4, step: 0.01 })
    jitterFolder.addInput(params, 'jitterRoughness', {
      min: 0,
      max: 4,
      step: 0.01,
    })

    const definesFolder = pane.addFolder({ title: 'Tracing' })

    definesFolder.addInput(params, 'steps', { min: 1, max: 256, step: 1 })
    definesFolder.addInput(params, 'refineSteps', { min: 0, max: 16, step: 1 })
    definesFolder.addInput(params, 'missedRays')

    const resolutionFolder = pane.addFolder({
      title: 'Resolution',
      expanded: false,
    })
    resolutionFolder.addInput(params, 'resolutionScale', {
      min: 0.125,
      max: 1,
      step: 0.125,
    })
    resolutionFolder.addInput(params, 'velocityResolutionScale', {
      min: 0.125,
      max: 1,
      step: 0.125,
    })
  }
}
//
