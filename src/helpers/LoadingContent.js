import { Text } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import anime from 'animejs'
import { useFrame } from '@react-three/fiber'

//
export function LoadingContent({ onHide = () => {} }) {
  let status = useRef({
    phase: 'fadeIn',
    fadeIn: 1,
    fadeOut: 0,
  })
  let ref = useRef()
  useEffect(() => {
    status.current.phase = 'fadeIn'
    status.current.fadeIn = 3
    anime({
      targets: [status.current],
      fadeIn: 1,
      duration: 1000,
      complete: async () => {
        status.current.phase = 'fadeOut'
        status.current.fadeOut = 1
        anime({
          targets: [status.current],
          fadeOut: 2,
          duration: 1500,
          complete: () => {
            onHide()
          },
        })
      },
    })
  })

  useFrame(() => {
    if (status.current.phase === 'fadeIn') {
      if (ref.current) {
        ref.current.scale.setScalar(status.current.fadeIn)
      }
    }
    if (status.current.phase === 'fadeOut') {
      if (ref.current) {
        ref.current.scale.setScalar(status.current.fadeOut)
      }
    }
  })

  return (
    <>
      <Text fontSize={1} color='black'>
        Loading....
      </Text>
      <gridHelper
        ref={ref}
        position={[0, 0, 0]}
        args={[100, 100, 0xff0000, 0x0000ff]}
      ></gridHelper>
    </>
  )
}
