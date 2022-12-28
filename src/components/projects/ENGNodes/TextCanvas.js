import { useEffect, useState } from 'react'
import { DoubleSide } from 'three'
import { CanvasTexture } from 'three140'
export function TextCnavas({
  align = 'center',
  text = 'Lorem ipsum dolor sit amet',
}) {
  //
  let [tex, setTexture] = useState(false)

  useEffect(() => {
    //
    const c = document.createElement('canvas')
    const ctx = c.getContext('2d')
    c.width = text.length * 21
    c.height = 80

    c.width += 25 + 50

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, c.width - 0, c.height - 0)
    ctx.strokeRect(0, 0, c.width - 0, c.height - 0)

    ctx.font = 'bold 38px Arial'
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'
    ctx.fillStyle = 'black'
    ctx.fillText(text, c.width / 2, c.height / 2)

    let texture = new CanvasTexture(c)
    texture.generateMipmaps = true
    texture.needsUpdate = true

    setTexture({
      wRatio: c.width / c.height,
      hRatio: c.height / c.width,
      texture: texture,
      canvas: c,
      size: [ctx.canvas.width, ctx.canvas.height],
    })
  }, [text])

  let getX = () => {
    if (align === 'left') {
      return -1.5 / tex.hRatio / 2 + -1
    } else if (align === 'right') {
      return 1.5 / tex.hRatio / 2 + 1
    } else {
      return 0
    }
  }
  return (
    <>
      {tex && (
        <mesh position={[getX(), 0, 0]} scale={1.0}>
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
