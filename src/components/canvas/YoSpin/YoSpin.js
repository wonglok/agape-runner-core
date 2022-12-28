import { useScrollStore } from '@/helpers/useScrollStore'
import { useEffect, useRef } from 'react'

export function YoSpin({ children }) {
  let ref = useRef()
  useEffect(() => {
    return useScrollStore.subscribe((v) => {
      ref.current.rotation.y = v.smooth * Math.PI
    })
  })
  return <group ref={ref}>{children}</group>
}
