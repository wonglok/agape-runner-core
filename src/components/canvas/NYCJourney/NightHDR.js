import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
// import { sRGBEncoding } from 'three'
// import { TextureLoader } from 'three'
import { EquirectangularReflectionMapping } from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
export function NightHDR() {
  //
  let scene = useThree((s) => s.scene)
  useEffect(() => {
    //
    let loader = new RGBELoader()

    // public
    loader.loadAsync(`/hdr/BROADWAY_LAFAYETTE_STATION_2.hdr`).then((tex) => {
      // loader.loadAsync(`/hdr/studio_small_08_1k.hdr`).then((tex) => {
      tex.mapping = EquirectangularReflectionMapping
      scene.background = tex
      scene.environment = tex
    })

    // let loader2 = new TextureLoader()
    // loader2.loadAsync(`/scene/2022-06-01-rabbit/gradient.png`).then((tex) => {
    //   //
    //   tex.encoding = sRGBEncoding
    //   tex.mapping = EquirectangularReflectionMapping
    //   scene.environment = tex
    //   scene.background = tex
    // })
  }, [scene])
  //
  return <group></group>
}

//
