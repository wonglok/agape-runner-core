import { useEffect } from 'react'
import { useMultiverse } from './useMultiverse'

export function ConnectKeyboard() {
  let setKeyboard = useMultiverse((s) => s.setKeyboard)
  useEffect(() => {
    return setKeyboard()
  })
  return null
}
