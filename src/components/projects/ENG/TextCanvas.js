import { useEffect, useState } from 'react'
import { DoubleSide } from 'three'
import { CanvasTexture } from 'three140'
export function ENGTextCnavas({ text = 'Lorem ipsum dolor sit amet' }) {
  //
  let [tex, setTexture] = useState(false)

  useEffect(() => {
    //
    const c = document.createElement('canvas')
    const ctx = c.getContext('2d')
    c.width = text.length * 21
    c.height = 80

    c.width += 25

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, c.width - 0, c.height - 0)
    ctx.strokeRect(0, 0, c.width - 0, c.height - 0)

    ctx.font = 'bold 38px Arial'
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'
    ctx.fillStyle = 'black'
    ctx.fillText(text, c.width / 2, c.height / 2)

    let texture = new CanvasTexture(c)
    texture.needsUpdate = true

    setTexture({
      wRatio: c.width / c.height,
      hRatio: c.height / c.width,
      texture: texture,
      canvas: c,
      size: [ctx.canvas.width, ctx.canvas.height],
    })
  }, [text])

  return (
    <>
      {tex && (
        <mesh
          scale={1.0}
          position-y={4}
          position-z={-4}
          rotation-x={Math.PI * -0.25}
        >
          <planeBufferGeometry
            args={[1.5 / tex.hRatio, 1.5]}
          ></planeBufferGeometry>
          <meshBasicMaterial
            side={DoubleSide}
            map={tex.texture}
            transparent={true}
            color={'#ffffff'}
          ></meshBasicMaterial>
        </mesh>
      )}
    </>
  )
}

//

//
