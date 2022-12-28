import React, { useEffect } from 'react'
import gsap from 'gsap'
import { useFrame } from '@react-three/fiber'

// sync gsap raf to r3f raf
gsap.ticker.remove(gsap.updateRoot)

export const GsapTicker = () => {
  const pg = React.useRef(0)
  gsap.ticker.remove(gsap.updateRoot)

  useFrame((_, delta) => {
    pg.current += delta
    gsap.updateRoot(pg.current)
  })
  useEffect(() => {
    return () => {
      gsap.ticker.remove(gsap.updateRoot)
    }
  })
  return null
}
