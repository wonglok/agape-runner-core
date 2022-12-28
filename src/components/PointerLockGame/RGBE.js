import { Environment } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { EquirectangularReflectionMapping } from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

export function RGBE({ rgbeURL, background = false }) {
  let rgbe = useLoader(RGBELoader, rgbeURL)
  rgbe.mapping = EquirectangularReflectionMapping

  return (
    <>
      <Environment map={rgbe} background={background}></Environment>
    </>
  )
}
