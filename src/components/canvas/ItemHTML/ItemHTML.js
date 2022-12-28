import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

export function ItemHTML({ idx = 0 }) {
  let data = useScroll()
  let animRef1 = useRef()
  useFrame(() => {
    const b = data.range(idx / data.pages, 1 / data.pages)

    // delta = velocity
    const acceleration = data.delta

    //
    const totalJourney = data.offset

    if (animRef1.current) {
      const output = b

      animRef1.current.style.transform = `translate3d(${
        output * 100
      }vw, 0px, 0px)`
    }
  })

  return (
    <div className='flex items-end h-full'>
      <div
        style={{ background: 'red', width: '10px', height: '10px' }}
        ref={animRef1}
      ></div>
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
    </div>
  )
}
