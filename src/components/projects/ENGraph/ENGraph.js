import { AdditiveBlending, sRGBEncoding } from 'three'
import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect } from 'react'
import { ENGOriginButton } from '../ENGOriginButton/ENGOriginButton'
import { Box, MapControls, Select } from '@react-three/drei'
import { useGLBEditor } from '@/helpers/useGLBEditor'
import { ENGHDR } from '../ENGHDR/ENGHDR'
import { IconComputer } from '../ENGOriginButton/IconComputer'
import { ENGAddGraphNode } from '../ENGAddGraphNode/ENGAddGraphNode'
import { ENGraphFloor } from '../ENGraphFloor/ENGraphFloor'
import { AddItemCurosr } from '../ENGAddItemCurosr/ENGAddItemCurosr'
import { ENGNodes } from '../ENGNodes/ENGNodes'
import { ConnectedWires } from '../ENGConnectedWires/ConnectedWires'
import { ENGDraggingWire } from '../ENGDraggingWire/ENGDraggingWire'
// import { Bloom, EffectComposer, Noise } from '@react-three/postprocessing'
// import { GLSSR } from '@/helpers/GLSSR'

export function ENGraph() {
  return (
    <div className='relative w-full h-full'>
      <Canvas
        className='w-full h-full'
        onCreated={(st) => {
          st.gl.physicallyCorrectLights = true
          st.gl.outputEncoding = sRGBEncoding
        }}
      >
        <color attach={'background'} args={['#222222']}></color>
        <gridHelper args={[500, 250, 0x555555, 0x555555]}></gridHelper>

        <Suspense fallback={null}>
          <Content></Content>
        </Suspense>
      </Canvas>

      {/* <OverlayHtml></OverlayHtml> */}
    </div>
  )
}

export function OverlayHtml() {
  let overlayENGraph = useGLBEditor((s) => s.overlayENGraph)
  let setOverlayENGraph = useGLBEditor((s) => s.setOverlayENGraph)

  useEffect(() => {
    let hh = () => {
      setOverlayENGraph('')
    }
    window.addEventListener('keydown', hh)
    return () => {
      window.removeEventListener('keydown', hh)
    }
  }, [overlayENGraph, setOverlayENGraph])
  return (
    <>
      {overlayENGraph === 'add-mods' && (
        <div className='absolute top-0 left-0 z-30 w-full h-full'>
          <ENGAddGraphNode></ENGAddGraphNode>
        </div>
      )}

      {overlayENGraph && (
        <div className=' absolute top-0 right-0 p-1'>
          <button
            onClick={() => {
              setOverlayENGraph('')
            }}
          >
            <svg
              width={24}
              height={24}
              clipRule='evenodd'
              fillRule='evenodd'
              strokeLinejoin='round'
              strokeMiterlimit='2'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill='red'
                d='m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 8.933-2.721-2.722c-.146-.146-.339-.219-.531-.219-.404 0-.75.324-.75.749 0 .193.073.384.219.531l2.722 2.722-2.728 2.728c-.147.147-.22.34-.22.531 0 .427.35.75.751.75.192 0 .384-.073.53-.219l2.728-2.728 2.729 2.728c.146.146.338.219.53.219.401 0 .75-.323.75-.75 0-.191-.073-.384-.22-.531l-2.727-2.728 2.717-2.717c.146-.147.219-.338.219-.531 0-.425-.346-.75-.75-.75-.192 0-.385.073-.531.22z'
                fillRule='nonzero'
              />
            </svg>
          </button>
        </div>
      )}
    </>
  )
}

//
function Content() {
  let setControls = useGLBEditor((s) => s.setControls)
  let activeSceneSelection = useGLBEditor((s) => s.activeSceneSelection)
  let setOverlayENGraph = useGLBEditor((s) => s.setOverlayENGraph)
  //
  // let nodeDrag = useGLBEditor((s) => s.nodeDrag)
  // let reloadGraphID = useGLBEditor((s) => s.reloadGraphID)
  return (
    <>
      {activeSceneSelection && (
        <>
          <MapControls
            ref={(controls) => {
              setControls(controls)
            }}
            target={[0, 0, 0]}
            object-position={[0, 20, 5]}
            enableDamping={true}
            enableRotate={false}
            enablePan={true}
          ></MapControls>

          <ENGDraggingWire></ENGDraggingWire>
          <ENGOriginButton></ENGOriginButton>

          <IconComputer
            onClick={() => {
              //
              setOverlayENGraph('add-mods')
              //
            }}
          ></IconComputer>

          <ENGHDR></ENGHDR>

          <AddItemCurosr></AddItemCurosr>

          <ENGraphFloor></ENGraphFloor>

          <Select
            multiple
            box={true}
            onChange={(arr) => {
              // console.log(arr)
            }}
            filter={(arr) => {
              console.log(arr)

              return arr
              // return v?.userData?.isEffectNodeModule === true
            }}
          >
            <ENGNodes></ENGNodes>
          </Select>

          <ConnectedWires></ConnectedWires>

          {/* <group position={[0, 1.5, 0]}>
            <ConnectedWires></ConnectedWires>
          </group> */}
        </>
      )}
    </>
  )
}
