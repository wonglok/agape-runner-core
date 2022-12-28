import { getID } from '@/helpers/getID'
import { createPortal } from '@react-three/fiber'
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
        name: 'position',
        type: 'vec3',
        value: { x: 0, y: 0, z: 0 },
      },
      {
        _id: getID(),
        nodeID,
        name: 'scale',
        type: 'vec3',
        value: { x: 1, y: 1, z: 1 },
      },
      {
        _id: getID(),
        nodeID,
        name: 'rotation',
        type: 'vec3',
        value: { x: 0, y: 0, z: 0 },
      },
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
    shaders: [],

    //
  }
}

export function effect({ node, mini, data, setComponent }) {
  //
  // setComponent
  //

  let receivers = {}

  let makeElemnet = () => {
    let values = []

    for (let socketInputName in receivers) {
      if (receivers[socketInputName]) {
        values.push(receivers[socketInputName])
      }
    }
    let defaultConfig = {
      position: [
        data.value.position.x,
        data.value.position.y,
        data.value.position.z,
      ],
      rotation: [
        data.value.rotation.x,
        data.value.rotation.y,
        data.value.rotation.z,
      ],
      scale: [
        //
        data.value.scale.x,
        data.value.scale.y,
        data.value.scale.z,
      ],
    }
    //
    // console.log(defaultConfig)
    //
    // console.log(data.value.rotation)
    //
    return (
      <group {...defaultConfig} key={getID()}>
        {values}
      </group>
    )
  }

  let send = () => {
    node.out0.pulse(makeElemnet(receivers))
  }

  let keys = ['in0', 'in1', 'in2', 'in3', 'in4', 'in5', 'in6', 'in7', 'in8']

  keys.forEach((socket) => {
    receivers[socket] = null
    node[socket].stream((v) => {
      receivers[socket] = v
      send()
    })
  })

  data.uniforms.position((sig) => {
    setTimeout(() => {
      send()
    })
  })
  data.uniforms.rotation((sig) => {
    setTimeout(() => {
      send()
    })
  })
  data.uniforms.scale((sig) => {
    setTimeout(() => {
      send()
    })
  })

  //

  //

  //

  //
  //
  //

  // //

  // keys.forEach((kn) => {
  //   console.log(data.value[kn])
  //   defaultConfig[kn] = data.value[kn] || null
  // })
}

//

/*
<Noise premultiply={true} opacity={0.2} />

<SSR {...props} />
<Bloom
  luminanceThreshold={0.2}
  mipmapBlur
  luminanceSmoothing={0}
  intensity={0.5}
/>
<LUT lut={texture} />
{/* <DepthOfField
    focusDistance={2}
    focalLength={0.02}
    bokehScale={2}
    height={480}
  />
  */
