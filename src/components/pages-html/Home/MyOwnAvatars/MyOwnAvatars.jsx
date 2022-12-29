import { GateState } from '@/auth/GateState.ts'
import { useSnapshot } from 'valtio'
import { SectionHeader } from '../Compos/SectionHeader'

export function MyOwnAvatars() {
  let gs = useSnapshot(GateState)

  return (
    <div className='relative h-full max-h-screen ease-soft-in-out xl:ml-68.5 '>
      <SectionHeader
        title='Avatars'
        subTitle='Programmable Avatar Apps'
        bgImage='/brand/avatar.webp'
        bgOffsetY={15}
      ></SectionHeader>
    </div>
  )
}
