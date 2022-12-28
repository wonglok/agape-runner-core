import { Sphere, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

export function Item({ idx, children, ...props }) {
  const ref = useRef()
  const data = useScroll()

  useFrame(({ viewport }) => {
    // data.offset = current scroll position, between 0 and 1, dampened
    // data.delta = current delta, between 0 and 1, dampened

    // Will be 0 when the scrollbar is at the starting position,
    // then increase to 1 until 1 / 3 of the scroll distance is reached
    const a = data.range(0, 1 / 3)
    // Will start increasing when 1 / 3 of the scroll distance is reached,
    // and reach 1 when it reaches 2 / 3rds.
    const b = data.range(1 / 3, 1 / 3)
    // Same as above but with a margin of 0.1 on both ends
    const c = data.range(1 / 3, 1 / 3, 0.1)
    // Will move between 0-1-0 for the selected range
    const d = data.curve(1 / 3, 1 / 3)
    // Same as above, but with a margin of 0.1 on both ends
    const d2 = data.curve(1 / 3, 1 / 3, 0.1)
    // Returns true if the offset is in range and false if it isn't
    const e = data.visible(2 / 3, 1 / 3)
    // The visible function can also receive a margin
    const f = data.visible(2 / 3, 1 / 3, 0.1)

    if (ref.current) {
      ref.current.position.y = -0.5 * viewport.height
      ref.current.position.x = -0.5 * viewport.width + viewport.width * a
    }
  })

  //
  return (
    <group ref={ref} {...props}>
      {children}
      {/* <Sphere></Sphere> */}
    </group>
  )
}
