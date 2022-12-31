/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { GateState } from '@/auth/GateState.ts'
import { useSnapshot } from 'valtio'
import { LeftMenu } from '../Compos/LeftMenu'
import { DesktopOnly } from '@/lib/desktop/DesktopOnly'
import { StylesDashboard } from '../Compos/StylesDashboard'
import { SmartDrawer } from '../Compos/SmartDrawer'
import { SectionHeader } from '../Compos/SectionHeader'
import { MyRecentSites } from './MyRecentSites'

export function PGHome({ content }) {
  //
  let gs = useSnapshot(GateState)

  return (
    <>
      <DesktopOnly>
        <StylesDashboard></StylesDashboard>
        <LeftMenu></LeftMenu>
        <SmartDrawer>
          <SectionHeader bgImage='../scene/2022-11-28-NYC/coverimage/mech2.png'></SectionHeader>
          <MyRecentSites></MyRecentSites>
          <MyRecentSites></MyRecentSites>
          <MyRecentSites></MyRecentSites>
          <MyRecentSites></MyRecentSites>
          <MyRecentSites></MyRecentSites>
          <MyRecentSites></MyRecentSites>
          <MyRecentSites></MyRecentSites>
          <MyRecentSites></MyRecentSites>
          <MyRecentSites></MyRecentSites>
          {/* <MyAvatars></MyAvatars> */}
          {/* <Cards></Cards> */}
        </SmartDrawer>
      </DesktopOnly>
    </>
  )
}
