import md5 from 'md5'
import { Object3D } from 'three140'

const getSignature = (it) => {
  let str = '' + it.name

  if (it.geometry) {
    str += it.geometry.attributes.position?.array?.length + '-'
    str += it.geometry.attributes.normal?.array?.length + '-'
  }

  let k = 0
  it.traverse((sb) => {
    str += `-${k}-${sb.name}-`
    k += 1
  })

  return str
}

//

export const GlobalsEmptyObjects = [
  'EN_PostProcessing',
  //
  // 'EN_MaterialLibrary',
]

export const assignSignaturesToGLB = (glb) => {
  let polyfillName = (name) => {
    let found = glb.scene.getObjectByName(name)
    if (!found) {
      let addNew = new Object3D()
      addNew.name = name
      glb.scene.add(addNew)
    }
  }

  GlobalsEmptyObjects.forEach(polyfillName)
  glb.scene.traverse((it) => {
    if (it) {
      it.userData.effectNode = it.userData.effectNode || {}

      //
      it.userData.effectNode.attachment =
        it.userData.effectNode.attachment || []
      //
      it.userData.effectNode.nodes = it.userData.effectNode.nodes || []
      //
      it.userData.effectNode.connections =
        it.userData.effectNode.connections || []

      it.userData.posMD5 = md5(getSignature(it))
    }
  })
}

//

//
