import { useEffect, useRef, useState } from 'react'
import { sRGBEncoding, LinearEncoding } from 'three'
import {
  TextureLoader,
  UVMapping,
  CubeReflectionMapping,
  CubeRefractionMapping,
  EquirectangularReflectionMapping,
  EquirectangularRefractionMapping,
  CubeUVReflectionMapping,
  // RepeatWrapping,
  // ClampToEdgeWrapping,
  // MirroredRepeatWrapping,
} from 'three'
import { Vector2 } from 'three140'
import Pane from 'tweakpane'

export function ENFTexture({ material, field }) {
  let [_, reload] = useState(0)
  let texture = material[field]

  let image = texture?.image

  let width = image?.width
  let height = image?.height

  //
  let ref = useRef()
  useEffect(() => {
    if (!texture?.image) {
      return
    }
    let ctx = ref.current.getContext('2d')
    ctx.drawImage(texture.image, 0, 0)
  }, [height, texture, width])

  // console.log(width, height)
  let onChoose = () => {
    let fin = document.createElement('input')
    fin.type = 'file'
    fin.accept = 'image/png, image/jpeg, image/jpg'
    fin.onchange = (ev) => {
      let first = ev.target.files[0]

      if (first) {
        console.log(first)
        let url = URL.createObjectURL(first)
        let texLoader = new TextureLoader()
        texLoader.loadAsync(url).then((tex) => {
          tex.encoding = sRGBEncoding
          tex.flipY = false
          material[field] = tex
          material.needsUpdate = true

          reload((s) => s + 1)
        })
      }
    }
    fin.click()
  }

  let onDownload = () => {
    //
    let url = ref.current.toDataURL('png', 100)
    let a = document.createElement('a')
    a.href = url
    a.download = 'texture.png'
    a.click()
  }

  let onSetNull = () => {
    //
    //
    //
    material[field] = null
    material.needsUpdate = true
    reload((s) => s + 1)
  }
  return (
    <div className='mb-3'>
      <span className='mt-1 mr-3'>{field}</span>

      {texture ? (
        <>
          <canvas
            className='w-full'
            width={width}
            height={height}
            ref={ref}
          ></canvas>
          {/* <input
            type='checkbox'
            value={texture.flipY}
            onChange={(v) => {
              texture.flipY = v.target.checked
              texture.needsUpdate = true
              reload((s) => s + 1)
            }}
          /> */}

          <TextureOptions
            onChoose={onChoose}
            onSetNull={onSetNull}
            texture={texture}
            material={material}
            field={field}
            onDownload={onDownload}
          ></TextureOptions>
          {/*  */}
        </>
      ) : (
        <>
          <button
            className='inline-block p-2 mb-2 bg-gray-200'
            onClick={onChoose}
          >
            Choose Texture
          </button>
        </>
      )}

      {/*  */}
    </div>
  )
}

//

//

function TextureOptions({
  onDownload,
  onChoose,
  onSetNull,
  material,
  field,
  texture,
}) {
  let ref = useRef()

  useEffect(() => {
    let pane = new Pane({
      container: ref.current,
      ttile: 'texture-properties',
    })

    let proxy = {
      get flipY() {
        return !!texture.flipY
      },
      set flipY(v) {
        texture.flipY = !!v
        texture.needsUpdate = true
      },

      get generateMipmaps() {
        return !!texture.generateMipmaps
      },
      set generateMipmaps(v) {
        texture.generateMipmaps = !!v
        texture.needsUpdate = true
      },
      get premultiplyAlpha() {
        return !!texture.premultiplyAlpha
      },
      set premultiplyAlpha(v) {
        texture.premultiplyAlpha = !!v
        texture.needsUpdate = true
      },
      //

      get mapping() {
        return texture.mapping
      },
      set mapping(v) {
        texture.mapping = v
        texture.needsUpdate = true
      },

      //
      get encoding() {
        return texture.encoding
      },
      set encoding(v) {
        texture.encoding = v
        texture.needsUpdate = true
      },
      get wrapS() {
        return texture.wrapS
      },
      set wrapS(v) {
        texture.wrapS = v
        texture.needsUpdate = true
      },
      get wrapT() {
        return texture.wrapT
      },
      set wrapT(v) {
        texture.wrapT = v
        texture.needsUpdate = true
      },

      //
      get center() {
        return texture.center || new Vector2()
      },
      set center(v) {
        texture.center.set(v.x, v.y)
        texture.needsUpdate = true
      },

      //
      get repeat() {
        return texture.repeat || new Vector2()
      },
      set repeat(v) {
        texture.repeat.set(v.x, v.y)
        texture.needsUpdate = true
      },

      //
      get offset() {
        return texture.offset || new Vector2()
      },
      set offset(v) {
        texture.offset.set(v.x, v.y)
        texture.needsUpdate = true
      },

      //
      get rotation() {
        return texture.rotation || 0
      },
      set rotation(v) {
        texture.rotation = v
        texture.needsUpdate = true
      },
    }

    pane.addInput(proxy, 'flipY')

    pane.addInput(proxy, 'generateMipmaps')
    // pane.addInput(proxy, 'premultiplyAlpha')
    pane.addInput(proxy, 'encoding', {
      options: {
        sRGBEncoding,
        LinearEncoding,
      },
    })
    pane.addInput(proxy, 'mapping', {
      options: {
        UVMapping,
        CubeReflectionMapping,
        CubeRefractionMapping,
        EquirectangularReflectionMapping,
        EquirectangularRefractionMapping,
        CubeUVReflectionMapping,
      },
    })

    // pane.addInput(proxy, 'wrapS', {
    //   options: {
    //     RepeatWrapping,
    //     ClampToEdgeWrapping,
    //     MirroredRepeatWrapping,
    //   },
    // })
    // pane.addInput(proxy, 'wrapT', {
    //   options: {
    //     RepeatWrapping,
    //     ClampToEdgeWrapping,
    //     MirroredRepeatWrapping,
    //   },
    // })

    let btn = pane.addButton({ title: 'Switch to other texture' })
    btn.on('click', () => {
      onChoose()
    })

    let btn2 = pane.addButton({ title: 'Remove Texture' })
    btn2.on('click', () => {
      if (window.confirm('remove?')) {
        onSetNull()
      }
    })

    let btn3 = pane.addButton({ title: 'Download Texture' })
    btn3.on('click', () => {
      //
      onDownload()
      //
    })

    // let updateMatrix = (type) => (ev) => {
    //   if (!material[field]) {
    //     return
    //   }
    //   if (type === 'rotation') {
    //     material[field][type] = ev
    //   } else {
    //     material[field][type].set(ev.x, ev.y)
    //   }
    //   material[field].updateMatrix()
    //   material[field].needsUpdate = true
    //   material.needsUpdate = true
    // }

    // pane.addInput(proxy, 'center')
    // // .on('change', updateMatrix('center'))
    // pane.addInput(proxy, 'offset')
    // // .on('change', updateMatrix('offset'))
    // pane.addInput(proxy, 'repeat')
    // // .on('change', updateMatrix('repeat'))
    // pane.addInput(proxy, 'rotation')
    // // .on('change', updateMatrix('rotation'))

    let tt = setInterval(() => {
      pane.refresh()
    })

    return () => {
      clearInterval(tt)
      pane.dispose()
    }
  }, [texture, onChoose, onSetNull, material, field])
  return <div ref={ref}></div>
}
