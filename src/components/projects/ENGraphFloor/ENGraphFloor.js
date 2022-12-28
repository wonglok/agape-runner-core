import { useGLBEditor } from '@/helpers/useGLBEditor'
import { Box } from '@react-three/drei'
import { AdditiveBlending, NormalBlending } from 'three'

export function ENGraphFloor() {
  let cursorMode = useGLBEditor((s) => s.cursorMode)
  let curosrPoint = useGLBEditor((s) => s.curosrPoint)
  let setNodeDrag = useGLBEditor((s) => s.setNodeDrag)
  let controls = useGLBEditor((s) => s.controls)
  let addByPlacing = useGLBEditor((s) => s.addByPlacing)

  return (
    <group>
      {/*  */}
      {/*  */}
      <Box
        position={[0, -0.05 + 0.01, 0]}
        onPointerDown={(ev) => {
          if (cursorMode === 'add') {
            addByPlacing()
          }

          // curosrPoint.userData.added.set(0, 0, 0)
        }}
        onPointerMove={(ev) => {
          curosrPoint.userData.diff.copy(ev.point).sub(curosrPoint.position)

          curosrPoint.userData.added.add(curosrPoint.userData.diff)
          curosrPoint.position.copy(ev.point)
          curosrPoint.position.y = 1
        }}
        //
        args={[500, 0.05, 500]}
        //

        onPointerUp={() => {
          setNodeDrag(null)
          controls.enabled = true
          // curosrPoint.userData.added.set(0, 0, 0)
        }}
      >
        <meshStandardMaterial color='#222222'></meshStandardMaterial>
      </Box>

      {/*  */}
    </group>
  )
}
