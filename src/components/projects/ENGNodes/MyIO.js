import { Vector3 } from 'three140'
import { getID } from '@/helpers/getID'
import { useGLBEditor } from '@/helpers/useGLBEditor'
import { TextCnavas } from './TextCanvas'

export function MyIO({ effectNode, io, idx, node, socket, e, total }) {
  let draggingIOID = useGLBEditor((s) => s.draggingIOID)
  let setDraggingIOID = useGLBEditor((s) => s.setDraggingIOID)
  let isDown = useGLBEditor((s) => s.isDown)
  let setDown = useGLBEditor((s) => s.setDown)

  let curosrPoint = useGLBEditor((s) => s.curosrPoint)
  let controls = useGLBEditor((s) => s.controls)
  let control = controls
  let dragStartPos = useGLBEditor((s) => s.dragStartPos)

  let addLink = useGLBEditor((s) => s.addLink)

  let refreshSystem = useGLBEditor((s) => s.refreshSystem)
  //
  let v3 = new Vector3()
  let v3b = new Vector3()

  let orbit = total
  let radius = 1

  let theta = e * -Math.PI

  if (io === 'output') {
    theta = Math.PI * e
  } else if (io === 'input') {
  }

  theta -= (0.5 * (Math.PI * 2)) / total
  theta += Math.PI * 1.5

  v3.setFromCylindricalCoords(orbit, theta, 0)
  v3b.setFromCylindricalCoords(orbit + 4.5, theta, 0)

  v3.set(0, 0, 0)
  v3b.set(0, 0, 0)

  if (io === 'input') {
    v3.x = -5
    v3b.x = -5 + -3
  } else {
    v3.x = 5
    v3b.x = 5 + 3
  }
  v3.z = (idx - total / 4) * 4.5
  v3b.z = (idx - total / 4) * 4.5

  let scan = () => {
    if (
      draggingIOID &&
      draggingIOID.socket._id !== socket._id &&
      draggingIOID.node._id !== node._id &&
      draggingIOID.socket.type !== socket.type
    ) {
      //
      let pair = [{ node, socket }, { ...draggingIOID }]
      let input = pair.find((e) => e.socket.type === 'input')
      let output = pair.find((e) => e.socket.type === 'output')

      // console.log(input, output)
      // console.log(input, output);
      if (input && output) {
        return { input, output }
      }
    }
  }

  let onPointerDown = (e) => {
    control.enabled = false

    e.stopPropagation()
    e.target.setPointerCapture(e.pointerId)

    setDown(true)
    setDraggingIOID({
      socket: JSON.parse(JSON.stringify(socket)),
      node: JSON.parse(JSON.stringify(node)),
    })

    dragStartPos.copy(curosrPoint.position)
  }
  let onPointerUp = (e) => {
    control.enabled = true

    e.stopPropagation()
    e.target.releasePointerCapture(e.pointerId)
    // ENMethods.saveCodeBlock({ node });

    let res = scan()

    // console.log(res)
    if (res) {
      // ENMethods.addLink({
      //   input: res.input.socket,
      //   output: res.output.socket,
      // })

      let result = {
        _id: getID(),
        input: res.input.socket,
        output: res.output.socket,
      }

      addLink({
        effectNode: effectNode,
        link: result,
      })
      refreshSystem()
    }

    setDown(false)
    setDraggingIOID(false)
  }
  let onPointerMove = () => {
    //
  }

  return (
    <group>
      {/*  */}
      <group rotation-x={-0.45 * Math.PI}>
        {socket.type === 'input' && (
          <TextCnavas align={'left'} text={socket.name || idx}></TextCnavas>
        )}
        {socket.type === 'output' && (
          <TextCnavas align={'right'} text={socket.name || idx}></TextCnavas>
        )}
      </group>

      {io === 'input' && (
        <mesh
          position={[0, 0, 0]}
          name={socket._id}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerMove={onPointerMove}
          // args={[1, 1, 1]}
          // radius={1 / 5}
        >
          {/*  */}
          {/* <cylinderBufferGeometry
            args={[2 / 5, 2 / 5, 0.5, 32, 32]}
          ></cylinderBufferGeometry> */}
          <cylinderBufferGeometry
            args={[2 / 5, 2 / 5, 2, 32, 32]}
          ></cylinderBufferGeometry>

          <meshStandardMaterial
            roughness={1}
            metalness={0.5}
            color={'white'}
          ></meshStandardMaterial>
        </mesh>
      )}

      {io === 'output' && (
        <mesh
          position={[0, 0, 0]}
          name={socket._id}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerMove={onPointerMove}
          //
          // args={[1, 1, 1]}
          // radius={2 / 5}
        >
          {/* <cylinderBufferGeometry
            args={[2 / 5, 2 / 5, 0.5, 32, 32]}
          ></cylinderBufferGeometry> */}
          <cylinderBufferGeometry
            args={[2 / 5, 2 / 5, 2, 32, 32]}
          ></cylinderBufferGeometry>

          <meshStandardMaterial
            roughness={1}
            metalness={0.5}
            color={'white'}
          ></meshStandardMaterial>
        </mesh>
      )}
    </group>
  )
}
