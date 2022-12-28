import { Box, Environment, PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Vector3 } from 'three'

/*
Stiffness (-20 kg / s2)
Damping (-0.5 kg / s)
Frequency (0) Hz
Mass (0.5) kg

*/
//https://burakkanber.com/blog/physics-in-javascript-car-suspension-part-1-spring-mass-damper/
/* Spring stiffness, in kg / s^2 */
let k = -20

/* Damping constant, in kg / s */
let b = -0.5

/* Block position and velocity. */
let block = {
  x: new Vector3(),
  v: new Vector3(),
  mass: 0.5,
  start: new Vector3(0, 0, 0),
}

let wall = { x: new Vector3(), v: new Vector3() }

let frameRate = 1 / 60

let mouse = { x: new Vector3(), isDown: false }

let F_spring = new Vector3()
let F_damper = new Vector3()
let a = new Vector3()

const Page = () => {
  let ref = useRef()
  // let viewport = useThree((s) => s.viewport)
  // let size = useThree((s) => s.size)

  useFrame((st, dt) => {
    frameRate = dt
    /* Move the wall. */
    // wall.t += frameRate
    // wall.lx = wall.x
    // wall.x = 30 + 70 * Math.sin(2 * Math.PI * wall.frequency * wall.t)
    // wall.v = (wall.x - wall.lx) / frameRate

    if (!mouse.isDown) {
      F_spring.copy(block.x).sub(wall.x).multiplyScalar(k).sub(block.start)
      F_damper.copy(block.v).sub(wall.v).multiplyScalar(b)

      a.copy(F_spring)
        .add(F_damper)
        .multiplyScalar(1 / block.mass)

      block.v.addScaledVector(a, frameRate)
      block.x.addScaledVector(block.v, frameRate)
    }

    if (ref.current) {
      ref.current.position.copy(block.x)
    }
  })
  return (
    <>
      {/* <YoSpin>
        <Box>
          <meshStandardMaterial color={'#ff0000'}></meshStandardMaterial>
        </Box>
      </YoSpin> */}
      <group position={[0.0, 0, 0]} scale={1}>
        <Box
          ref={ref}
          args={[1, 1, 0.0001]}
          onPointerDown={() => {
            mouse.isDown = true
          }}
          onPointerUp={() => {
            mouse.isDown = false
          }}
          onPointerLeave={() => {
            mouse.isDown = false
          }}
          onPointerMove={(ev) => {
            if (mouse.isDown) {
              mouse.x.copy(ev.point)
              block.x.copy(mouse.x)
            }
          }}
        >
          <meshStandardMaterial color={'#ff0000'}></meshStandardMaterial>
        </Box>
      </group>

      <Box scale={0.1} position={[0, 0.7, 0]}>
        <meshStandardMaterial color={'#0000ff'}></meshStandardMaterial>
      </Box>
      {/*  */}
      {/*  */}
      {/*  */}

      <Environment preset='apartment' background></Environment>

      {/*  */}
      {/*  */}
      {/*  */}
    </>
  )
}

Page.layout = 'PromotePage'

Page.SEO = function SEO() {
  return <span className=''>{/* <Loader></Loader> */}</span>
}

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

//
