import { getID } from '@/helpers/getID'

export function doSharedPostProc({
  node,
  mini,
  data,
  defaultValues,
  componentName,
}) {
  let getType = (v) => {
    if (typeof v === 'boolean') {
      return 'bool'
    } else if (typeof v === 'number') {
      return 'float'
    } else if (typeof v === 'object' && typeof v.y !== 'undefined') {
      return 'vec2'
    } else if (typeof v === 'object' && typeof v.z !== 'undefined') {
      return 'vec3'
    } else if (typeof v === 'object' && typeof v.w !== 'undefined') {
      return 'vec4'
    } else if (typeof v === 'string') {
      return 'text'
    } else {
      return 'float'
    }
  }

  for (let kn in defaultValues) {
    if (!node.data.uniforms.some((u) => u.name === kn)) {
      let val = {
        id: getID(),
        nodeID: node.data.nodeID,
        name: kn,
        type: getType(defaultValues[kn]),
        protected: true,
        value: defaultValues[kn],
      }
      node.data.uniforms.push(val)
    }
  }

  let _id = node.nodeID + 'out0'
  let send = () => {
    let props = {}
    node.data.uniforms.forEach((uni) => {
      props[uni.name] = data.value[uni.name]
    })

    for (let kn in props) {
      if (!props[kn]) {
        delete props[kn]
      }
    }

    node.out0.pulse({
      _id: _id,
      type: componentName,
      props,
    })
  }

  node.data.uniforms.forEach((uni) => {
    data.uniforms[uni.name](() => {
      send()
    })
  })

  send()

  mini.onClean(() => {
    node.out0.pulse(false)
  })
}
