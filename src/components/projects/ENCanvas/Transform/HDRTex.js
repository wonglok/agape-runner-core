import { useLoader, useThree } from '@react-three/fiber'
import { TextureLoader } from 'three140'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { EquirectangularReflectionMapping, sRGBEncoding } from 'three140'
import { useEffect } from 'react'

export function HDRTex({ url, scene }) {
  let using = TextureLoader

  if (url.indexOf('.hdr') !== -1) {
    using = RGBELoader
  }

  let tex = useLoader(using, url)
  useEffect(() => {
    if (using === TextureLoader) {
      tex.encoding = sRGBEncoding
    } else {
      //
    }
    tex.mapping = EquirectangularReflectionMapping

    scene.environment = tex
    scene.background = tex

    return () => {
      //
    }
  }, [])

  return null
}
