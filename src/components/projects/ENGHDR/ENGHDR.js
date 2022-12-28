import { useLoader, useThree } from '@react-three/fiber'
import { EquirectangularReflectionMapping } from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

export function ENGHDR({ url = '/hdr/greenwich_park_02_1k.hdr' }) {
  //
  let engHDR = useLoader(RGBELoader, url)
  engHDR.mapping = EquirectangularReflectionMapping
  let scene = useThree((s) => s.scene)
  scene.environment = engHDR
  //
  //
}
