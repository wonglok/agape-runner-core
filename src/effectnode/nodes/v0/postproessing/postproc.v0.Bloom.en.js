import { getID } from '@/helpers/getID'
import { doSharedPostProc } from './common-postproc'
export async function nodeData({ defaultData, nodeID }) {
  return {
    ...defaultData,
    inputs: [
      //
      { _id: getID(), type: 'input', nodeID },
    ],
    outputs: [
      //
      { _id: getID(), type: 'output', nodeID },
    ],

    //
    material: [],
    uniforms: [],
    shaders: [],
  }
}

export async function effect({ node, mini, data, setComponent }) {
  let defaultValues = {
    luminanceThreshold: 0.1,
    luminanceSmoothing: 0.025,
    mipmapBlur: true,
    intensity: 1,
    radius: 0.85,
    levels: 8,
    resolutionScale: 0.5,
    // kernelSize: KernelSize.LARGE,
    // width: Resolution.AUTO_SIZE,
    // height: Resolution.AUTO_SIZE,
  }

  return await doSharedPostProc({
    componentName: 'Bloom',
    defaultValues,
    node,
    mini,
    data,
    setComponent,
  })
}

//

//

//

//

//

//
