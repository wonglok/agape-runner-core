import { PointerLockGame } from '@/components/PointerLockGame/PointerLockGame'
import { Loader } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Core } from '@/helpers/Core'

export default function Page() {
  return <PointerLockGame></PointerLockGame>
}

Page.SEO = function Page() {
  return (
    <>
      <div className=' absolute top-0 left-0'></div>
      <Loader></Loader>
    </>
  )
}

async function getStaticProps() {
  return {
    props: {
      title: 'Game Page',
    },
  }
}

export { getStaticProps }

//
