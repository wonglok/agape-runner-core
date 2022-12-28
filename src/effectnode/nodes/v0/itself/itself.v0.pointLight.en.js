import { getID } from '@/helpers/getID'
import { createPortal } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { generateUUID } from 'three/src/math/MathUtils'
import { Color, Object3D, PointLight } from 'three140'

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
      {
        _id: getID(),
        nodeID,
        protected: true,
        name: 'transformPosition',
        type: 'vec3',
        needsInit: true,
        value: { x: 0, y: 0, z: 0 },
      },
      {
        _id: getID(),
        nodeID,
        protected: true,
        name: 'transformScale',
        type: 'vec3',
        needsInit: true,

        value: { x: 1, y: 1, z: 1 },
      },
      {
        _id: getID(),
        nodeID,
        protected: true,
        name: 'transformRotation',
        type: 'vec3',
        needsInit: true,
        value: { x: 0, y: 0, z: 0 },
      },
      {
        _id: getID(),
        nodeID,
        protected: true,
        name: 'useTranslate',
        type: 'button',
        needsInit: true,
        value: { x: 0, y: 0, z: 0 },
      },
      {
        _id: getID(),
        nodeID,
        protected: true,
        name: 'useRotation',
        type: 'button',
        needsInit: true,
        value: { x: 0, y: 0, z: 0 },
      },
      {
        _id: getID(),
        nodeID,
        protected: true,
        name: 'useScale',
        type: 'button',
        needsInit: true,
        value: { x: 0, y: 0, z: 0 },
      },
      {
        _id: getID(),
        nodeID,
        protected: true,
        name: 'color',
        type: 'color',
        needsInit: true,
        value: '#ff0000',
      },
      {
        _id: getID(),
        nodeID,
        protected: true,
        name: 'intensity',
        type: 'float',
        needsInit: true,
        value: 100,
      },
      {
        _id: getID(),
        nodeID,
        protected: true,
        name: 'distance',
        type: 'float',
        needsInit: true,
        value: 100,
      },
      {
        _id: getID(),
        nodeID,
        protected: true,
        name: 'decay',
        type: 'float',
        needsInit: true,
        value: 2,
      },
      {
        _id: getID(),
        nodeID,
        protected: true,
        name: 'castShadow',
        type: 'bool',
        needsInit: true,
        value: 2,
      },
    ],

    //
    shaders: [],

    //
  }
}

function Parent({ node, data, mini }) {
  let ref = useRef()
  let ref2 = useRef()
  useEffect(() => {
    let color = new Color(data.value.color)
    mini.onLoop(() => {
      /** @type {PointLight} */
      let object = ref.current

      if (!object) {
        return
      }

      if (object && data.value.transformPosition) {
        object.position.copy(data.value.transformPosition)
      }
      if (object && data.value.transformRotation) {
        object.rotation.x = data.value.transformRotation.x
        object.rotation.y = data.value.transformRotation.y
        object.rotation.z = data.value.transformRotation.z
      }
      if (object && data.value.transformScale) {
        object.scale.copy(data.value.transformScale)
      }

      if (object && data.value.intensity) {
        object.intensity = data.value.intensity
      }
      if (object && data.value.color) {
        color.set(data.value.color)
        object.color = color
      }

      if (object && data.value.distance) {
        object.distance = data.value.distance
      }
      if (object && data.value.decay) {
        object.decay = data.value.decay
      }
      if (object && typeof data.value.castShadow !== 'undefined') {
        object.castShadow = data.value.castShadow
      }

      /** @type {Object3D} */
      let o2 = ref2.current
      if (o2) {
        mini.now.itself.getWorldPosition(o2.position)
        mini.now.itself.getWorldQuaternion(o2.quaternion)
        mini.now.itself.getWorldScale(o2.scale)
      }
    })

    //
  })

  return (
    <group ref={ref2}>
      <pointLight
        userData={{ removeBeforeExport: true }}
        ref={ref}
      ></pointLight>

      {/* <Inbound socketName={'in0'} node={node} data={data} mini={mini}></Inbound>
      <Inbound socketName={'in1'} node={node} data={data} mini={mini}></Inbound>
      <Inbound socketName={'in2'} node={node} data={data} mini={mini}></Inbound>
      <Inbound socketName={'in3'} node={node} data={data} mini={mini}></Inbound>
      <Inbound socketName={'in4'} node={node} data={data} mini={mini}></Inbound>
      <Inbound socketName={'in5'} node={node} data={data} mini={mini}></Inbound>
      <Inbound socketName={'in6'} node={node} data={data} mini={mini}></Inbound>
      <Inbound socketName={'in7'} node={node} data={data} mini={mini}></Inbound>
      <Inbound socketName={'in8'} node={node} data={data} mini={mini}></Inbound>
      <Inbound socketName={'in9'} node={node} data={data} mini={mini}></Inbound> */}
    </group>
  )
}

export function effect({ node, mini, data, setComponent }) {
  setComponent(
    <Parent node={node} key={generateUUID()} mini={mini} data={data}></Parent>
  )
}
