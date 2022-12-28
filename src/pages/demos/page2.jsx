import { Companion } from '@/helpers/Companion'
import { Floor } from '@/helpers/Floor'
import { screenOpacity } from '@/helpers/GLOverlayEffect'
import { useMultiverse } from '@/helpers/useMultiverse'
import { useSystemStore } from '@/helpers/useSystemStore'
import { Box, Environment, Sphere } from '@react-three/drei'
import anime from 'animejs'
import Router from 'next/router'
import { Suspense } from 'react'

const Page = (props) => {
  let setShowFloor = useMultiverse((s) => s.setShowFloor)
  return (
    <>
      <Floor url='/scene/landing/os-effect1.glb'></Floor>

      <Sphere
        position={[-3, 1, 1]}
        onClick={() => {
          screenOpacity.value = 1
          anime({
            targets: [screenOpacity],
            value: 0,
            update: () => {},
            complete: () => {
              Router.router.push('/page3')
            },
          })
        }}
      >
        <meshStandardMaterial color={'#ff0000'}></meshStandardMaterial>
      </Sphere>

      <Suspense fallback={null}>
        <Suspense fallback={null}>
          <Companion
            frustumCulled={false}
            runActionName='sprint_forward'
            url={`/scene/landing/swat-mo-1024.glb`}
            speed={4}
            lookAtOffset={[0, 0, -2]}
            walkOffset={[0, 0, -0.01]}
          ></Companion>
        </Suspense>

        {/* <Suspense fallback={null}>
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
        </Suspense> */}
      </Suspense>

      <Environment preset='park'></Environment>

      {/*  */}
    </>
  )
}
Page.layout = 'Multiverse'

async function getStaticProps() {
  return {
    props: {
      sceneName: 'page2',
      title: 'Effect Node Forge',
    },
  }
}

export { getStaticProps }
export default Page

//
