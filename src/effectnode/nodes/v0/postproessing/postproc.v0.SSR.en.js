import { getID } from '@/helpers/getID'
import { Bloom } from '@react-three/postprocessing'
import { doSharedPostProc } from './common-postproc'
// import { createPortal } from '@react-three/fiber'
// import { useEffect, useState } from 'react'
// import { Object3D } from 'three140'
//

export async function nodeData({ defaultData, nodeID }) {
  return {
    ...defaultData,

    //
    //
    inputs: [
      //
      { _id: getID(), type: 'input', nodeID },
    ],

    // at least 1
    //
    outputs: [
      //
      { _id: getID(), type: 'output', nodeID },
    ],

    //
    material: [],

    //
    uniforms: [
      // {
      //   _id: getID(),
      //   nodeID,
      //   name: 'speed',
      //   type: 'float',
      //   value: 1,
      // },
      //
      // {
      //   _id: getID(),
      //   nodeID,
      //   name: 'colorA',
      //   type: 'color',
      //   value: '#00ff89',
      // },
      // {
      //   id: getID(),
      //   nodeID,
      //   name: 'shader',
      //   type: `glsl`,
      //   value: `
      //   `,
      // },
    ],

    //
    //
    shaders: [],

    //
  }
}

export async function effect({ node, mini, data, setComponent }) {
  let props = {
    temporalResolve: true,
    STRETCH_MISSED_RAYS: true,
    USE_MRT: true,
    USE_NORMALMAP: true,
    USE_ROUGHNESSMAP: true,
    ENABLE_JITTERING: true,
    ENABLE_BLUR: false,
    DITHERING: false,
    temporalResolveMix: 0.5,
    temporalResolveCorrectionMix: 0.5,
    maxSamples: 3,
    resolutionScale: 1,
    blurMix: 0.5,
    blurKernelSize: 8,
    BLUR_EXPONENT: 10,
    rayStep: 0.5,
    intensity: 3.5,
    maxRoughness: 1,
    jitter: 0.15,
    jitterSpread: 0.5,
    jitterRough: 0.5,
    roughnessFadeOut: 1,
    rayFadeOut: 0.2,
    MAX_STEPS: 20,
    NUM_BINARY_SEARCH_STEPS: 6,
    maxDepthDifference: 7,
    maxDepth: 3,
    thickness: 3,
    ior: 1.35,
  }

  return await doSharedPostProc({
    componentName: 'SSR',
    defaultValues: props,
    node,
    mini,
    data,
    setComponent,
  })

  //

  //
  // //
  // //
  // let output = {
  //   _id: getID(),
  //   type: 'SSR',
  //   props: {
  //     //
  //   },
  // }

  // node.out0.pulse(output)
  //
}

//
