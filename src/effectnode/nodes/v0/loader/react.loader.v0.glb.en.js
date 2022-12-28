import { EffectNodeRuntime } from '@/effectnode/component/EffectNodeRuntime'
import { getID } from '@/helpers/getID'
import { useEffect, useState } from 'react'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { Bloom, EffectComposer, Noise } from '@react-three/postprocessing'

export async function nodeData({ defaultData, nodeID }) {
  // let defs = getDefinitions({ nodeID })

  return {
    ...defaultData,

    //
    inputs: [
      //
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
      { _id: getID(), type: 'output', nodeID },
      { _id: getID(), type: 'output', nodeID },
      { _id: getID(), type: 'output', nodeID },
      { _id: getID(), type: 'output', nodeID },
    ],

    //
    material: [
      //
    ],

    // uniforms: [
    //   ...defs.uniforms,
    //   // {
    //   //   id: getID(),
    //   //   nodeID,
    //   //   name: 'shader',
    //   //   type: `glsl`,
    //   //   value: `
    //   //   `,
    //   // },
    // ],
    //

    uniforms: [
      {
        id: getID(),
        nodeID,
        name: 'glb',
        type: 'glb',
        value: false,
        protected: true,
      },
    ],

    //
    shaders: [],

    //
  }
}

let loader = new GLTFLoader()
let draco = new DRACOLoader()
draco.setDecoderPath(`/draco/`)
draco.setCrossOrigin('')
loader.setDRACOLoader(draco)

// let computeCache = new Map()
let loadGLB = async (v) => {
  let yo = await loader.loadAsync(v)

  return yo
}

//
// let getSide = (side) => {
//   if (side === 'front') {
//     return FrontSide
//   } else if (side === 'back') {
//     return BackSide
//   } else if (side === 'double') {
//     return DoubleSide
//   }
// }

// let original = new Map()

// function Socket({ node, mini, data }) {
//   let [item, setItem] = useState(null)

//   return (
//     <group>
//       {item}
//       {/*  */}
//       {/*  */}
//       {/*  */}
//       {/*  */}
//       {/*  */}
//     </group>
//   )
// }

export function effect({ node, mini, data, setComponent }) {
  //
  let MakeObject = () => {
    let [glb, setGLB] = useState(null)

    useEffect(() => {
      // data.value.glb
      let send = (url) => {
        setGLB(null)

        if (url) {
          loadGLB(url).then((glb) => {
            setGLB(glb)
          })
        } else {
          setGLB(null)
        }
      }

      data.uniforms.glb((sig) => {
        send(sig.value)
      })
      send(data.value.glb)
    }, [])

    //
    return (
      <>
        {glb && (
          <group key={getID()}>
            <primitive object={glb.scene} />
            <EffectNodeRuntime key={getID()} glbObject={glb} />
          </group>
        )}
      </>
    )
  }

  node.out0.pulse(<MakeObject key={getID()}></MakeObject>)
  node.out1.pulse(<MakeObject key={getID()}></MakeObject>)
  node.out2.pulse(<MakeObject key={getID()}></MakeObject>)
  node.out3.pulse(<MakeObject key={getID()}></MakeObject>)
  node.out4.pulse(<MakeObject key={getID()}></MakeObject>)

  //
  // //
  // setComponent(
  //   <>
  //     <Socket node={node} mini={mini} data={data}></Socket>
  //   </>
  // )
  // let send = () => {
  //   if (data.value.glb) {
  //     //
  //     loadGLB(data.value.glb).then(async (glb) => {
  //       node.out0.pulse(
  //         <group key={getID()}>
  //           <primitive object={glb.scene} />
  //           <EffectNodeRuntime key={getID()} glbObject={glb} />
  //         </group>
  //       )
  //       node.out1.pulse(
  //         <group key={getID()}>
  //           <primitive object={glb.scene} />
  //           <EffectNodeRuntime key={getID()} glbObject={glb} />
  //         </group>
  //       )
  //       node.out2.pulse(
  //         <group key={getID()}>
  //           <primitive object={glb.scene} />
  //           <EffectNodeRuntime key={getID()} glbObject={glb} />
  //         </group>
  //       )
  //       node.out3.pulse(
  //         <group key={getID()}>
  //           <primitive object={glb.scene} />
  //           <EffectNodeRuntime key={getID()} glbObject={glb} />
  //         </group>
  //       )
  //       node.out4.pulse(
  //         <group key={getID()}>
  //           <primitive object={glb.scene} />
  //           <EffectNodeRuntime key={getID()} glbObject={glb} />
  //         </group>
  //       )
  //     })
  //   }
  // }
  // //
  // data.uniforms.glb((sig) => {
  //   send(sig.value)
  // })
  // send(data.value.glb)
  // mini.onClean(() => {
  //   node.out0.pulse(null)
  // })
  //
  // //
  // // setComponent
  // //
  // let defs = getDefinitions({ nodeID: data.raw.nodeID })
  // // let inputReceivers = {}
  // // let makeElemnet = () => {
  // //   let kidz = []
  // //   for (let socketInputName in inputReceivers) {
  // //     if (inputReceivers[socketInputName]) {
  // //       kidz.push(inputReceivers[socketInputName])
  // //     }
  // //   }
  // //   return (
  // //   )
  // // }
  // let send = () => {
  //   if (!original.has(data.raw.nodeID)) {
  //     original.set(data.raw.nodeID, mini.now.itself.material.clone())
  //   }
  //   let clonedOrig = original.get(data.raw.nodeID).clone()
  //   mini.now.itself.material = clonedOrig
  //   delete clonedOrig.defines
  //   let newMat = new MeshPhysicalMaterial({ ...clonedOrig })
  //   defs.uniforms.forEach((uni) => {
  //     let val = data.value[uni.name]
  //     if (val) {
  //       if (uni.name === 'side') {
  //         newMat[uni.name] = getSide(val)
  //       } else if (uni.type === 'float') {
  //         newMat[uni.name] = val
  //       } else if (uni.type === 'color') {
  //         newMat[uni.name] = new Color(val)
  //       } else if (uni.type === 'texture') {
  //         newMat[uni.name] = loadTexture(val)
  //       }
  //     }
  //     //
  //   })
  //   mini.now.itself.material = newMat
  // }
  // // let inputSockets = ['in0', 'in1', 'in2', 'in3', 'in4']
  // // inputSockets.forEach((socket) => {
  // //   inputReceivers[socket] = null
  // //   node[socket].stream((v) => {
  // //     inputReceivers[socket] = v
  // //     send()
  // //   })
  // // })
  // let last = {}
  // defs.uniforms.forEach((uni) => {
  //   //
  //   data.uniforms[uni.name]((signal) => {
  //     if (last[uni.name] !== signal.value) {
  //       last[uni.name] = signal.value
  //       send()
  //     }
  //   })
  //   //
  // })
  // send()
  //
  //
  //
}
