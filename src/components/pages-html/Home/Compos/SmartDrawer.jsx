import { useSnapshot } from 'valtio'
import { GUIState } from './GUIState'

export function SmartDrawer({ children }) {
  let gui = useSnapshot(GUIState)

  return (
    <div
      className={` transition-all duration-300 ${
        gui.menuOpen ? '' : ' lg:ml-56 '
      }`}
    >
      {children}
    </div>
  )
}
