import {
  Box,
  Environment,
  // PerspectiveCamera,
  // Text,
  // Trail,
} from '@react-three/drei'
import Router from 'next/router'
import { Suspense, useEffect } from 'react'
import { Floor } from '@/helpers/Floor'
import { Companion } from '@/helpers/Companion'
import anime from 'animejs'
import { screenOpacity } from '@/helpers/GLOverlayEffect'
// import { useMultiverse } from '@/helpers/useMultiverse'
// import { TheVortex } from '@/components/canvas/TheVortex/TheVortex'
// import { LineStuff } from '@/helpers/LineDrop/LineStuff'
// import { useThree } from '@react-three/fiber'
// import { Vector3 } from 'three'
// import dynamic from 'next/dynamic'

const Page = (props) => {
  //
  //
  return (
    <>
      <Floor url='/scene/workspace/os-effect1.glb'></Floor>

      <Box
        position={[3, 1, 1]}
        onClick={() => {
          //
          screenOpacity.value = 1
          anime({
            targets: [screenOpacity],
            value: 0,
            update: () => {},
            complete: () => {
              Router.router.push('/page2')
            },
          })
        }}
      >
        <meshStandardMaterial color={'#ff0000'}></meshStandardMaterial>
      </Box>
      <Suspense fallback={null}>
        <Companion
          frustumCulled={false}
          runActionName='sprint_forward'
          url={`/scene/landing/swat-mo-1024.glb`}
          speed={4}
          lookAtOffset={[0, 0, 0]}
          walkOffset={[0, 0, -0.01]}
        ></Companion>
      </Suspense>

      {/*
      <Suspense fallback={null}>
        <Companion
          frustumCulled={false}
          runActionName='sprint_forward'
          url={`/scene/landing/swat-mo-1024.glb`}
          speed={4}
          lookAtOffset={[0, 0, -2]}
          walkOffset={[1, 0, -0.01]}
        ></Companion>
      </Suspense>
      <Suspense fallback={null}>
        <Companion
          frustumCulled={false}
          runActionName='sprint_forward'
          url={`/scene/landing/swat-mo-1024.glb`}
          speed={4}
          lookAtOffset={[0, 0, -2]}
          walkOffset={[-1, 0, -0.01]}
        ></Companion>
      </Suspense>
      */}

      {/*  */}
      {/*  */}

      <Environment background={true} preset='night'></Environment>

      {/*  */}
      {/*  */}
    </>
  )
}
Page.layout = 'Multiverse'

async function getStaticProps() {
  return {
    props: {
      sceneName: 'index',
      title: 'Effect Node Forge',
    },
  }
}

export { getStaticProps }
export default Page

//
