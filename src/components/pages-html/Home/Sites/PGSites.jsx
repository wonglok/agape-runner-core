/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { GateState } from '@/auth/GateState.ts'
import { useSnapshot } from 'valtio'
import { LeftMenu } from '../Compos/LeftMenu'
import { DesktopOnly } from '@/lib/desktop/DesktopOnly'
import { SectionHeader } from '../Compos/SectionHeader'
import { StylesDashboard } from '../Compos/StylesDashboard'

export function PGSites({ content }) {
  let gs = useSnapshot(GateState)

  return (
    <>
      <DesktopOnly>
        <StylesDashboard></StylesDashboard>
        <LeftMenu></LeftMenu>
        <div className=' '>
          <SectionHeader
            title='My Sites'
            subTitle='Programmable Avatar Apps'
            bgImage='/brand/avatar.webp'
            bgOffsetY={15}
          ></SectionHeader>
        </div>
      </DesktopOnly>
    </>
  )
}
