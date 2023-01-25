import { GateState } from '@/auth/GateState.ts'
import { useSnapshot } from 'valtio'
import { RedirectToPage } from './RedirectToPage'
import { DesktopOnly } from '../desktop/DesktopOnly'

export default function RedirGateHTML({ redirect = '/avatar', children }) {
  let gs = useSnapshot(GateState)

  return (
    <>
      {gs.readyStatus === 'done' ? (
        <>
          {gs.userSession ? (
            <>{children}</>
          ) : (
            <RedirectToPage redirect={redirect}></RedirectToPage>
          )}
        </>
      ) : null}
    </>
  )
}

//
