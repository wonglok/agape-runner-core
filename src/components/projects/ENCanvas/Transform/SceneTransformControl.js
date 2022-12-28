import { useEffect } from 'react'
// import { useAccessor } from '@/vfx-studio/store/use-accessor'
import { createPortal, useThree } from '@react-three/fiber'
// import { HDRTex } from './HDRTex'
// import {
//   // FlyControls,
//   // MapControls,
//   // OrbitControls,
//   Select,
//   useAnimations,
//   useFBO,
// } from '@react-three/drei'
import {
  // BoxBufferGeometry,
  // BoxHelper,
  // DoubleSide,
  Object3D,
  // PlaneBufferGeometry,
  // Vector3,
} from 'three'
// import anime from 'animejs'
// import { OnlineSystem } from '@/vfx-meta/online/OnlineSystem'
// import { useMetaStore } from '@/vfx-meta/store/use-meta-store'
// import { TransformControls } from 'three144/examples/jsm/controls/TransformControls.js'
import { useMultiverse } from '@/helpers/useMultiverse'
import { useGLBEditor } from '@/helpers/useGLBEditor'
import { TransformControls } from './TCNew'
import { Quaternion, Vector3 } from 'three140'
// import { clone } from 'three/examples/jsm/utils/SkeletonUtils'

export function SceneTransformControl({
  object = new Object3D(),
  onChange = () => {},
  fakeScene,
  camera,
  gl,
}) {
  //
  useEffect(() => {
    if (!object) {
      return
    }
    if (!object?.parent) {
      return
    }
    let tc = new TransformControls(camera, gl.domElement)
    let parent = new Object3D()
    if (!object.parent) {
      object.parent = parent
    }
    let o3 = object
    tc.attach(o3)
    fakeScene.add(tc)
    tc.setMode('translate')

    let cloned = new Object3D()
    cloned.position.copy(o3.position)
    cloned.rotation.copy(o3.rotation)
    cloned.scale.copy(o3.scale)
    let deltaPos = new Vector3()
    let deltaScale = new Vector3()
    let deltaRot = new Vector3()
    let tttt = setInterval(() => {
      //

      deltaPos.copy(o3.position).sub(cloned.position)
      deltaScale.copy(o3.scale).sub(cloned.scale)
      deltaRot.x = o3.rotation.x - cloned.rotation.x
      deltaRot.y = o3.rotation.y - cloned.rotation.y
      deltaRot.z = o3.rotation.z - cloned.rotation.z

      cloned.position.copy(o3.position)
      cloned.quaternion.copy(o3.quaternion)
      cloned.scale.copy(o3.scale)

      if (deltaPos.length() > 0) {
        useGLBEditor.getState().multipleSelection?.forEach((ms) => {
          if (ms.uuid !== o3.uuid) {
            ms.position.add(deltaPos)
          }
        })
      }

      if (deltaScale.length() > 0) {
        useGLBEditor.getState().multipleSelection?.forEach((ms) => {
          if (ms.uuid !== o3.uuid) {
            ms.scale.add(deltaScale)
          }
        })
      }
      if (deltaRot.length() > 0) {
        useGLBEditor.getState().multipleSelection?.forEach((ms) => {
          if (ms.uuid !== o3.uuid) {
            ms.rotation.x += deltaRot.x
            ms.rotation.y += deltaRot.y
            ms.rotation.z += deltaRot.z
          }
        })
      }
    })

    tc.addEventListener('change', (ev) => {
      onChange(object)

      window.dispatchEvent(new CustomEvent('transform-update', { detail: o3 }))
    })

    let canDo = true
    window.addEventListener('useTranslate', () => {
      if (!canDo) {
        return
      }
      tc.setMode('translate')
    })
    window.addEventListener('useRotation', () => {
      if (!canDo) {
        return
      }
      tc.setMode('rotate')
    })
    window.addEventListener('useScale', () => {
      if (!canDo) {
        return
      }
      tc.setMode('scale')
    })

    //
    tc.addEventListener('dragging-changed', (ev) => {
      let ctrl = useMultiverse.getState().controls

      if (useGLBEditor.getState().editorNavigationMode === 'orbit') {
        ctrl = useGLBEditor.getState().orbit
      }

      if (ctrl) {
        let setTo = !ev.value

        if (setTo) {
          onChange(object)
          setTimeout(() => {
            ctrl.enabled = setTo
            useGLBEditor.setState({ enableSelect: setTo })
          }, 250)
        } else {
          ctrl.enabled = setTo
          useGLBEditor.setState({ enableSelect: setTo })
          onChange(object)
        }
      }
    })

    const cb = (e) => e.key === 'Escape' && tc.reset()

    document.addEventListener('keydown', cb)

    return () => {
      clearInterval(tttt)
      canDo = false
      tc.visible = false
      tc.dispose()
    }
  }, [camera, fakeScene, object, onChange, gl?.domElement])

  return null
}
