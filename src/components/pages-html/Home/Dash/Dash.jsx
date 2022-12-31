import { GateState } from '@/auth/GateState.ts'
import { useSnapshot } from 'valtio'
import { MyAvatars } from './MyAvatars'
import { MyPlaces } from './MyPlaces'
import { SectionHeader } from '../Compos/SectionHeader'
import { Cards } from './Cards'
import { MyRecentSites } from './MyRecentSites'
import { GUIState } from '../Compos/GUIState'
import { SmartDrawer } from '../Compos/SmartDrawer'

export function Dash() {
  // let gs = useSnapshot(GateState)
  return (
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
  )
}
