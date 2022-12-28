import { useFrame } from '@react-three/fiber'
import { useMultiverse } from './useMultiverse'

export function ConnectSimulationPointer() {
  let updatePlayerPointer = useMultiverse((s) => s.updatePlayerPointer)
  useFrame((st, dt) => {
    if (dt >= 100) {
      dt = 100
    }
    updatePlayerPointer(dt)
  })
  return null
}
