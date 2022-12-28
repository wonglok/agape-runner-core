import { Box, Environment, PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

/*
Stiffness (-20 kg / s2)
Damping (-0.5 kg / s)
Frequency (0) Hz
Mass (0.5) kg

*/
//https://burakkanber.com/blog/physics-in-javascript-car-suspension-part-1-spring-mass-damper/
/* Spring stiffness, in kg / s^2 */
let k = -10
let spring_length = 1

/* Damping constant, in kg / s */
let b = -0.5

/* Block position and velocity. */
let block = { x: 0, v: 0, mass: 0.1 }
let wall = { x: 0, v: 0 }

let frameRate = 1 / 60

let mouse = { x: 0, y: 0, isDown: false }

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
      let F_spring = k * (block.x - wall.x - spring_length)
      let F_damper = b * (block.v - wall.v)

      let a = (F_spring + F_damper) / block.mass
      block.v += a * frameRate
      block.x += block.v * frameRate
    }

    if (ref.current) {
      ref.current.position.x = block.x
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
          args={[1, 1, 1]}
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
            mouse.x = ev.point.x
            if (mouse.isDown) {
              block.x = mouse.x
            }
          }}
        >
          <meshStandardMaterial color={'#ff0000'}></meshStandardMaterial>
        </Box>
      </group>

      <Box>
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
