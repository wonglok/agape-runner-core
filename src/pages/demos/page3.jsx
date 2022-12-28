import {
  Box,
  Environment,
  Lightformer,
  PerspectiveCamera,
  Text,
} from '@react-three/drei'
// import Router from 'next/router'
import { Suspense, useEffect } from 'react'
import { Floor } from '@/helpers/Floor'
// import { Companion } from '@/helpers/Companion'
// import { useMultiverse } from '@/helpers/useMultiverse'
// import anime from 'animejs'
// import { screenOpacity } from '@/helpers/GLOverlayEffect'
import { RedMech } from '@/components/mech/RedMech'
// import { Video } from '@/components/Video/Video'
import { sRGBEncoding } from 'three'
// import { LineStuff } from '@/helpers/LineDrop/LineStuff'
// import { useThree } from '@react-three/fiber'
// import { Vector3 } from 'three'
// import dynamic from 'next/dynamic'

const Page = (props) => {
  return (
    <>
      <Floor url='/scene/mech/box.glb'></Floor>
      {/*
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
              Router.router.push('/page4')
            },
          })
        }}
        args={[2, 2, 2]}
      >
        <meshStandardMaterial color={'#ff0000'}></meshStandardMaterial>
      </Box> */}

      <Environment
        preset='night'
        frames={1}
        background={true}
        encoding={sRGBEncoding}
      ></Environment>

      {/* <group position={[0, 0.1, -10]}>
        <Video url={`/scene/mech-red/redmech-720.mp4`}></Video>
      </group> */}
      {/*
      <group rotation={[0, -3.141592 * 0.25, 0]} position={[16, 0.1, -3]}>
        <Video url={`/scene/mech-red/redmech-720.mp4`}></Video>
      </group>

      <group rotation={[0, 3.141592 * 0.25, 0]} position={[-16, 0.1, -3]}>
        <Video url={`/scene/mech-red/redmech-720.mp4`}></Video>
      </group> */}

      <group position={[0, 0, -25]}>
        <RedMech></RedMech>
      </group>
      {/*  */}

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
