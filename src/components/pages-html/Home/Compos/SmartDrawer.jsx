import { useSnapshot } from 'valtio'
import { GUIState } from './GUIState'

export function SmartDrawer({ children }) {
  let gui = useSnapshot(GUIState)

  return (
    <div
      className={` shadow-slate-400  transition-all duration-300 pb-1 ${
        gui.menuOpen ? '' : ' lg:ml-72 '
      }`}
    >
      {children}
    </div>
  )
}
