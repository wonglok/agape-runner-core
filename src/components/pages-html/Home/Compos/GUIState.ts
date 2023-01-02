import { proxy } from 'valtio'

export const GUIState = proxy<{
  menuOpen: boolean
  siteID: string
  pageID: string
}>({
  menuOpen: false,
  siteID: '',
  pageID: '',
})
