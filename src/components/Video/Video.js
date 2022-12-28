import { useState, useEffect } from 'react'
import { DoubleSide, sRGBEncoding } from 'three'
import { useThree } from '@react-three/fiber'

export function Video({ url }) {
  // Video texture by: https://www.pexels.com/@rostislav/
  const [video] = useState(() =>
    Object.assign(document.createElement('video'), {
      src: url,
      crossOrigin: 'Anonymous',
      loop: true,
      muted: true,
      playsInline: true,
    })
  )

  let gl = useThree((s) => s.gl)

  useEffect(() => {
    gl.domElement.onclick = () => {
      video.play()
    }
    gl.domElement.ontouchstart = () => {
      video.play()
    }
    return () => {
      gl.domElement.ontouchstart = () => {}
      gl.domElement.onclick = () => {}
    }
  })
  useEffect(() => {
    video.oncanplay = () => {
      video.play()
    }
    video.requestVideoFrameCallback(() => {
      video.play()
    })
  }, [video])
  return (
    <mesh position={[0, (18 * 9) / 16 / 2, 0]} scale-y={1}>
      <boxBufferGeometry args={[18, (18 * 9) / 16, 0.1]} />
      <meshBasicMaterial toneMapped={false} side={DoubleSide}>
        <videoTexture attach='map' args={[video]} encoding={sRGBEncoding} />
      </meshBasicMaterial>
    </mesh>
  )
}
