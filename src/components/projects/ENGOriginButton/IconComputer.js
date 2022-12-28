import { Box, RoundedBox, Text, useGLTF } from '@react-three/drei'
import { Suspense } from 'react'

export function IconComputer({ onClick = () => {} }) {
  return (
    // <Suspense fallback={null}>
    <ImplementationOfBtn onClick={onClick}></ImplementationOfBtn>
    // </Suspense>
  )
}

export function ImplementationOfBtn({ onClick }) {
  // let glb = useGLTF(`/effectnode/mac-draco.glb`)
  return (
    <group
      scale={1}
      onPointerEnter={() => {
        document.body.style.cursor = 'pointer'
      }}
      onPointerLeave={() => {
        document.body.style.cursor = ''
      }}
      onPointerDown={onClick}
    >
      <Text
        color={'#000000'}
        fontSize={0.7}
        maxWidth={200}
        lineHeight={1}
        textAlign={'center'}
        font='/font/Cronos-Pro-Light_12448.ttf'
        anchorX='center'
        anchorY='middle'
        outlineWidth={0.1}
        outlineColor='#ffffff'
        rotation-x={Math.PI * -0.45}
        position={[0, 0.5, 0]}
        scale={1.5}
      >
        Add Moudle Node
      </Text>

      <RoundedBox position={[0, 0, -1]} args={[13, 0.2, 6]} radius={0.5 / 3}>
        <meshStandardMaterial color={'#ffffff'} metalness={0} roughness={0.5} />
      </RoundedBox>
    </group>
  )
}
//
