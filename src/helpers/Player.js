import { useMultiverse } from './useMultiverse'

export function Player({ visible = true }) {
  let player = useMultiverse((s) => s.player)
  return (
    <group visible={visible}>
      <primitive object={player}></primitive>
    </group>
  )
}
