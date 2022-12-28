import { useFrame } from '@react-three/fiber'
import { useMultiverse } from './useMultiverse'

export function ConnectSimulation() {
  let updatePlayer = useMultiverse((s) => s.updatePlayer)
  useFrame((st, dt) => {
    if (dt >= 100) {
      dt = 100
    }
    updatePlayer(dt)
  })
  return null
}
