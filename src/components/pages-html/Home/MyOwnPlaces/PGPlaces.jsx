/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { GateState } from '@/auth/GateState.ts'
import { useSnapshot } from 'valtio'
import { LeftMenu } from '../Compos/LeftMenu'
import { DesktopOnly } from '@/lib/desktop/DesktopOnly'
import { SectionHeader } from '../Compos/SectionHeader'
import { StylesDashboard } from '../Compos/StylesDashboard'

export function PGPlaces({ content }) {
  let gs = useSnapshot(GateState)

  return (
    <>
      <DesktopOnly>
        <StylesDashboard></StylesDashboard>
        <LeftMenu></LeftMenu>
        {/*  */}
        {/*  */}
        <div className=' '>
          <SectionHeader
            title='Places'
            subTitle='Where you can hangout'
            bgImage='/brand/place.webp'
            bgOffsetY={52}
          ></SectionHeader>
        </div>
      </DesktopOnly>
    </>
  )
}
