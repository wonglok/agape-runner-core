import { GLSSR } from '@/helpers/GLSSR'
import { useGLBEditor } from '@/helpers/useGLBEditor'
import * as PROC from '@react-three/postprocessing'
import { EffectComposer } from '@react-three/postprocessing'
import { useEffectNode } from '../store/useEffectNode'

export function PostProcCallers({}) {
  let passArray = useEffectNode((s) => s.passArray)
  // let setPassArray = useEffectNode((s) => s.setPassArray)
  let screenPass = useEffectNode((s) => s.screenPass)
  // let setPassArray = useEffectNode((s) => s.setPassArray)
  // let activeGLBRuntimeObject = useGLBEditor((s) => s.activeGLBRuntimeObject)

  // useEffect(() => {
  //   return () => {
  //     setPassArray([])
  //   }
  // }, [setPassArray])

  return (
    <>
      {/* <CameraFling></CameraFling> */}
      <EffectComposer multisampling={0}>
        {passArray.map((info, idx) => {
          let Compo =
            PROC[info.type] ||
            function Empty() {
              return null
            }

          if (info.type === 'GLSSR') {
            Compo = GLSSR
          }
          return (
            <Compo key={'postproc' + info.type + idx} {...info.props}></Compo>
          )
        })}

        {screenPass}
      </EffectComposer>
    </>
  )
}

// //

// function CameraFling() {
//   let camera = useThree((s) => s.camera)

//   useFrame(() => {
//     camera.rotation.z += (Math.random() - 0.5) * 0.0005
//     camera.position.z += (Math.random() - 0.5) * 0.0005
//   })

//   return null
// }
