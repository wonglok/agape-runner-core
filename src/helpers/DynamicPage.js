import {
  Box,
  // Box,
  Environment,
  // PerspectiveCamera,
  // Text,
  // Trail,
} from '@react-three/drei'
import Router from 'next/router'
// import { Suspense, useEffect } from 'react'
import { Floor } from '@/helpers/Floor'
import { useEffect, useRef } from 'react'
import { useState } from 'react'
// import { Companion } from '@/helpers/Companion'
import anime from 'animejs'
import { screenOpacity } from '@/helpers/GLOverlayEffect'

// import { useMultiverse } from '@/helpers/useMultiverse'
// import { TheVortex } from '@/components/canvas/TheVortex/TheVortex'
// import { LineStuff } from '@/helpers/LineDrop/LineStuff'
// import { useThree } from '@react-three/fiber'
// import { Vector3 } from 'three'
// import dynamic from 'next/dynamic'

const DynamicPage = (props) => {
  //!SECTION

  return (
    <>
      <group>
        <Floor
          initPos={[0, 1.5, 5]}
          lookAt={[0, 1.0, 0]}
          url={`/scene/2022-12-28/os-effect.glb`}
        ></Floor>
      </group>

      <Environment background={true} preset='apartment'></Environment>

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

      {/*  */}

      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/* <Suspense fallback={null}>
        <Companion
          frustumCulled={false}
          runActionName='sprint_forward'
          url={`/scene/landing/swat-mo-1024.glb`}
          speed={4}
          lookAtOffset={[0, 0, 0]}
          walkOffset={[0, 0, -0.01]}
        ></Companion>
      </Suspense> */}

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
      {/*  */}
    </>
  )
}
DynamicPage.layout = 'Multiverse'

export async function getServerSidePropsForDynamicPage(context) {
  //

  return {
    props: {
      host: context?.req?.headers?.host || '',
      referer: context?.req?.headers?.referer || '',
      title: 'Agape Town - Here we go!',
    }, // will be passed to the page component as props
  }
}

//
//
export { DynamicPage }

//
//
