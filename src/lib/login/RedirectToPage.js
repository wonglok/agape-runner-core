import { SESSION_REDIRECT_KEY } from '@/auth/GateConst'
import { useEffect } from 'react'

export function RedirectToPage({ redirect }) {
  useEffect(() => {
    if (redirect) {
      localStorage.setItem(SESSION_REDIRECT_KEY, redirect)
      location.assign(`/connect`)
    }
  }, [redirect])
  return null
}
//
