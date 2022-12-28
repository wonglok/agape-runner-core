import { useGLBEditor } from '@/helpers/useGLBEditor'
import { Text } from '@react-three/drei'

export function ENGOriginButton() {
  let activeSceneSelection = useGLBEditor((s) => s.activeSceneSelection)
  return (
    <group>
      {activeSceneSelection && (
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
          position={[0, 0.5, -2]}
        >
          {activeSceneSelection.name}
        </Text>
      )}
    </group>
  )
}
