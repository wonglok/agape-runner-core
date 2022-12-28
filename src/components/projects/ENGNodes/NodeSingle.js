import { useGLBEditor } from '@/helpers/useGLBEditor'
import { RoundedBox, useSelect } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { MyIO } from './MyIO'
import { TextCnavas } from './TextCanvas'

export function NodeSingle({ effectNode, node }) {
  let ref = useRef()
  // let setParamsTab = useGLBEditor((s) => s.setParamsTab)
  let controls = useGLBEditor((s) => s.controls)

  let setNodeDrag = useGLBEditor((s) => s.setNodeDrag)
  let curosrPoint = useGLBEditor((s) => s.curosrPoint)
  let nodeDrag = useGLBEditor((s) => s.nodeDrag)
  let setActiveNodeID = useGLBEditor((s) => s.setActiveNodeID)

  let sync = () => {
    if (nodeDrag && nodeDrag?._id === node?._id && curosrPoint) {
      node.position[0] =
        curosrPoint.userData.down.x + curosrPoint.userData.added.x
      node.position[1] = 1
      node.position[2] =
        curosrPoint.userData.down.z + curosrPoint.userData.added.z
    } else {
    }

    if (ref.current && node?.position) {
      ref.current.position.fromArray(node.position)
      ref.current.position.y = 1
    }
  }
  useFrame(() => {
    // //
    sync()
  })

  let inc = useRef(0)

  let sel = useSelect()
  sel = sel || []

  useEffect(() => {
    if (!sel || (sel && !sel[0])) {
      setActiveNodeID('')
    }

    return () => {}
  }, [node, sel, setActiveNodeID])

  if (!node) {
    return <></>
  }

  //
  return (
    <group ref={ref}>
      <RoundedBox
        userData={{
          isEffectNodeModule: true,
          node,
          effectNode,
        }}
        args={[5, 0.5, 5]}
        radius={0.5 / 3}
        onPointerDown={(ev) => {
          if (node) {
            setActiveNodeID(node._id)
            curosrPoint.userData.added.set(0, 0, 0)
            curosrPoint.userData.down.fromArray(node.position)
            curosrPoint.userData.down.y = 1
            controls.enabled = false
            setNodeDrag(node)
          }
          inc.current = 0
        }}
        //
        onPointerMove={() => {
          inc.current++
        }}
        onPointerUp={() => {
          if (inc.current <= 5) {
            // console.log('open')
            //
            // setParamsTab('uniforms')
            //
          }
          sync()
          inc.current = 0
          setTimeout(() => {
            setNodeDrag(null)
          }, 100)
          controls.enabled = true
        }}
      >
        <meshStandardMaterial
          roughness={1}
          metalness={1}
          color={
            sel.some((r) => {
              return r?.userData?.node?._id === node._id
            })
              ? 'cyan'
              : 'gray'
          }
          transparent={true}
          opacity={1}
        ></meshStandardMaterial>
      </RoundedBox>

      {node && <TitleText node={node}></TitleText>}
      {node && <Inputs effectNode={effectNode} node={node}></Inputs>}
      {node && <Outputs effectNode={effectNode} node={node}></Outputs>}
    </group>
  )
}

function Inputs({ node, effectNode }) {
  return (
    <Suspense fallback={null}>
      <group>
        {node.inputs.map((e, idx, arr) => {
          return (
            <group key={e._id} position={[-3.5, 0, -2.5 + idx * 2]}>
              <MyIO
                effectNode={effectNode}
                io={'input'}
                key={e._id}
                socket={e}
                node={node}
                idx={idx}
                e={(idx + 0) / arr.length}
                total={node.inputs.length + node.outputs.length}
              ></MyIO>
            </group>
          )
        })}
      </group>
    </Suspense>
  )
}
function Outputs({ node, effectNode }) {
  return (
    <Suspense fallback={null}>
      <group>
        {node.outputs.map((e, idx, arr) => {
          return (
            <group key={e._id} position={[3.5, 0, -2.5 + idx * 2]}>
              <MyIO
                effectNode={effectNode}
                io={'input'}
                key={e._id}
                socket={e}
                node={node}
                idx={idx}
                e={(idx + 1) / arr.length}
                total={node.inputs.length + node.outputs.length}
              ></MyIO>
            </group>
          )
        })}
      </group>
    </Suspense>
  )
}

// children

function TitleText({ node }) {
  //
  let [show, setShow] = useState(false)

  useEffect(() => {
    setShow(false)
    setTimeout(() => {
      setShow(true)
    }, 100)

    return () => {
      setShow(false)
    }
  }, [node])

  //
  return (
    <Suspense fallback={null}>
      {show && (
        // <Html
        //   style={{
        //     minWidth: '200px',
        //     backgroundColor: 'white',
        //     pointerEvents: 'none',
        //     fontSize: '18px',
        //     zIndex: -1,
        //     padding: '5px 10px',
        //     border: 'black solid 1px',
        //   }}
        //   className='text-center pointer-events-none select-none'
        //   center
        //   transform
        //   position={[0, 1, 0]}
        //   rotation-x={Math.PI * -0.25}
        //   onPointerDown={(ev) => {
        //     ev.preventDefault()
        //   }}
        // >
        //   {node?.displayTitle}
        // </Html>
        <group rotation-x={Math.PI * -0.5} position-y={0.5} position-z={-5}>
          <TextCnavas text={node?.displayTitle}></TextCnavas>
        </group>
        // //
        // //
        // //
        // <Text
        //   key={node._id + node?.displayTitle}
        //   color={'#000000'}
        //   fontSize={0.7}
        //   maxWidth={200}
        //   lineHeight={1}
        //   textAlign={'center'}
        //   font='/font/Cronos-Pro-Light_12448.ttf'
        //   anchorX='center'
        //   anchorY='middle'
        //   outlineWidth={0.1}
        //   outlineColor='#ffffff'
        //   rotation-x={Math.PI * -0.25}
        //   position={[0, 0.5, 2.5]}
        // >
        //   {node?.displayTitle}
        // </Text>
      )}
    </Suspense>
  )
}
