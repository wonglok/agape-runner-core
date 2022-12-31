import { proxy } from 'valtio'

export const GUIState = proxy<{ menuOpen: boolean }>({
  menuOpen: false,
})
