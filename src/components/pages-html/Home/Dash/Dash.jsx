import { GateState } from '@/auth/GateState.ts'
import { useSnapshot } from 'valtio'
import { MyAvatars } from './MyAvatars'
import { MyPlaces } from './MyPlaces'
import { SectionHeader } from '../Compos/SectionHeader'
import { Cards } from './Cards'
import { MyRecentSites } from './MyRecentSites'

export function Dash() {
  // let gs = useSnapshot(GateState)

  return (
    <div className='relative h-full max-h-screen ease-soft-in-out xl:ml-68.5'>
      <SectionHeader bgImage='../scene/2022-11-28-NYC/coverimage/mech2.png'></SectionHeader>
      <MyRecentSites></MyRecentSites>
      {/* <MyAvatars></MyAvatars> */}
      {/* <Cards></Cards> */}
    </div>
  )
}
