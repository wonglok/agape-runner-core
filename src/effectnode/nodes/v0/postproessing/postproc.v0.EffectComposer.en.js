import { useEffectNode } from '@/effectnode/store/useEffectNode'
import { getID } from '@/helpers/getID'
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
      { _id: getID(), type: 'input', nodeID },
      { _id: getID(), type: 'input', nodeID },
      { _id: getID(), type: 'input', nodeID },
      { _id: getID(), type: 'input', nodeID },
      { _id: getID(), type: 'input', nodeID },
      { _id: getID(), type: 'input', nodeID },
      { _id: getID(), type: 'input', nodeID },
      { _id: getID(), type: 'input', nodeID },
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

export function effect({ node, mini, data, setComponent }) {
  //
  let inputNames = [
    'in0',
    'in1',
    'in2',
    'in3',
    'in4',
    'in5',
    'in6',
    'in7',
    'in8',
    'in9',
  ]

  let setPassArray = useEffectNode.getState().setPassArray
  let tree = {}

  let sync = () => {
    let data = Object.values(tree).filter((e) => e)
    setPassArray(data)
  }

  inputNames.forEach((name) => {
    node[name].stream((signal) => {
      if (signal) {
        tree[name] = signal
      } else {
        tree[name] = false
      }
      sync()
    })
  })

  mini.onClean(() => {
    tree = {}
    sync()
  })
  //
  //
  //
}

//
