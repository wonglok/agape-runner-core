/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { GateState } from '@/auth/GateState.ts'
import { useSnapshot } from 'valtio'
import { LeftMenu } from '../Compos/LeftMenu'
import { Dash } from './Dash'
import { DesktopOnly } from '@/lib/desktop/DesktopOnly'
import { StylesDashboard } from '../Compos/StylesDashboard'

export function PGHome({ content }) {
  //
  let gs = useSnapshot(GateState)

  return (
    <>
      <DesktopOnly>
        <StylesDashboard></StylesDashboard>
        <LeftMenu></LeftMenu>
        <Dash></Dash>
      </DesktopOnly>
    </>
  )
}
