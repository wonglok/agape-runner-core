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
    return <group key={getID()}>{values}</group>
  }

  let send = () => {
    setComponent(createPortal(makeElemnet(receivers), mini.now.scene))
  }

  let keys = ['in0', 'in1', 'in2', 'in3', 'in4', 'in5', 'in6', 'in7', 'in8']

  keys.forEach((socket) => {
    receivers[socket] = null
    node[socket].stream((v) => {
      receivers[socket] = v
      send()
    })
  })

  // keys.forEach((kn) => {
  //   data.uniforms[kn]((v) => {
  //     defaultConfig[kn] = v || null
  //     setComponent(makeElemnet(defaultConfig))
  //   })
  // })

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
