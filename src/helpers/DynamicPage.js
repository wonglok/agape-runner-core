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
// import { useEffect, useRef } from 'react'
// import { useState } from 'react'
// import { Companion } from '@/helpers/Companion'
import anime from 'animejs'
import { screenOpacity } from '@/helpers/GLOverlayEffect'
import { UserEndPoints } from './UserEndPoints'

// import { useMultiverse } from '@/helpers/useMultiverse'
// import { TheVortex } from '@/components/canvas/TheVortex/TheVortex'
// import { LineStuff } from '@/helpers/LineDrop/LineStuff'
// import { useThree } from '@react-three/fiber'
// import { Vector3 } from 'three'
// import dynamic from 'next/dynamic'

const DynamicPage = (props) => {
  //!SECTION

  console.log(props)

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
    </>
  )
}
DynamicPage.layout = 'Multiverse'

export async function getServerSidePropsForDynamicPage(context) {
  //
  let siteOID = null

  // preview route
  if (context?.params?.siteOID) {
    siteOID = context?.params?.siteOID
  }

  let host = context?.req?.headers?.host
  if (typeof host === 'string' && host !== '') {
    if (host.includes('.at.agape.town')) {
      //
      let slug = host.replace('.at.agape.town', '') || ''
      console.log(slug)
    } else {
      //
    }
  }

  // //
  // let domainMapping = false

  // try {
  //   let endPoint = UserEndPoints[process.env.NODE_ENV]
  //   let response = await fetch(`${endPoint}/domain-of-sites`, {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       domain: context?.req?.headers?.host || '',
  //     }),
  //   })

  //   let data = await response.json()

  //   if (response.ok) {
  //     domainMapping = data
  //   }
  // } catch (e) {
  //   console.error(e)
  //   console.error('seo')
  // }

  return {
    props: {
      siteOID,
      title: 'Agape Town',
    },
  }
}

export { DynamicPage }

//
//
//
