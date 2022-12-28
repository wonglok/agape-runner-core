import { getID } from '@/helpers/getID'
import { createPortal } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { Object3D } from 'three140'
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
      //
      //
      //
    ],

    //
    //
    shaders: [],

    //
  }
}

function Inbound({ socketName, node, mini }) {
  let [item, setItem] = useState(null)

  useEffect(() => {
    node[socketName].ready.then((v) => {
      setItem(v)
    })

    //
    node[socketName].stream((v) => {
      setItem(v)
    })

    return () => {
      //
    }
  }, [mini, node, socketName])
  return <group>{item}</group>
}

export function effect({ node, mini, data, setComponent }) {
  let o3d = new Object3D()
  mini.now.scene.add(o3d)

  mini.onLoop(() => {
    mini.now.itself.getWorldPosition(o3d.position)
    mini.now.itself.getWorldQuaternion(o3d.quaternion)
    mini.now.itself.getWorldScale(o3d.scale)
  })

  setComponent(
    createPortal(
      <group>
        <Inbound socketName={'in0'} node={node} mini={mini}></Inbound>
        <Inbound socketName={'in1'} node={node} mini={mini}></Inbound>
        <Inbound socketName={'in2'} node={node} mini={mini}></Inbound>
        <Inbound socketName={'in3'} node={node} mini={mini}></Inbound>
        <Inbound socketName={'in4'} node={node} mini={mini}></Inbound>
        <Inbound socketName={'in5'} node={node} mini={mini}></Inbound>
        <Inbound socketName={'in6'} node={node} mini={mini}></Inbound>
        <Inbound socketName={'in7'} node={node} mini={mini}></Inbound>
        <Inbound socketName={'in8'} node={node} mini={mini}></Inbound>
        <Inbound socketName={'in9'} node={node} mini={mini}></Inbound>
      </group>,
      o3d
    )
  )
}

//
