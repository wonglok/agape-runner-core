import { useGLBEditor } from '@/helpers/useGLBEditor'
import { TransformControls } from '@react-three/drei'
import { createPortal, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { SceneTransformControl } from './SceneTransformControl'

export function TransformControlsFix({ fakeScene }) {
  //

  let activeSceneSelection = useGLBEditor((s) => s.activeSceneSelection)
  // let ref = useRef()
  let camera = useThree((s) => s.camera)
  let gl = useThree((s) => s.gl)

  // enableSelect
  useEffect(() => {
    // let hh = (ev) => {
    //   let ctrl = useMultiverse.getState().controls
    //   if (useGLBEditor.getState().orbit) {
    //     ctrl = useGLBEditor.getState().orbit
    //   }
    //   if (ctrl) {
    //     let setTo = !ev.value
    //     if (setTo) {
    //       setTimeout(() => {
    //         ctrl.enabled = setTo
    //       }, 250)
    //     } else {
    //       ctrl.enabled = setTo
    //     }
    //   }
    // }
    // let target = ref.current
    // target.addEventListener('dragging-changed', hh)
    // return () => {
    //   target.removeEventListener('dragging-changed', hh)
    // }
  }, [])
  //

  // let ref = useRef()

  // useEffect(() => {
  //   const cb = (e) => e.key === 'Escape' && ref.current.reset()
  //   document.addEventListener('keydown', cb)
  //   return () => document.removeEventListener('keydown', cb)
  // }, [])

  // //
  // return (
  //   <>
  //     {createPortal(
  //       <TransformControls
  //         ref={ref}
  //         key={'123'}
  //         object={activeSceneSelection}
  //       ></TransformControls>,
  //       fakeScene
  //     )}
  //   </>
  // )
  return (
    activeSceneSelection &&
    camera &&
    gl &&
    fakeScene && (
      <SceneTransformControl
        camera={camera}
        gl={gl}
        object={activeSceneSelection}
        fakeScene={fakeScene}
      ></SceneTransformControl>
    )
  )
}
