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
          <SectionHeader
            bar={
              <div className='flex flex-wrap '>
                <img
                  src={
                    gs.userSession.picture ||
                    '../scene/2022-11-28-NYC/coverimage/agape.png'
                  }
                  style={{ width: `85px` }}
                  className=' rounded-xl'
                />
                <div className='flex-none w-auto max-w-full px-3'>
                  <div className='flex flex-col items-start justify-center h-full'>
                    <h5 className='mb-1 font-semibold'>
                      {gs.userSession.name}
                    </h5>
                    <p className='mb-0 text-sm leading-normal'>
                      Role: {gs.userSession.tenantID}
                    </p>
                  </div>
                </div>
              </div>
            }
            bgImage='../scene/2022-11-28-NYC/coverimage/mech2.png'
          ></SectionHeader>
          <MyRecentSites></MyRecentSites>

          {/*  */}
          {/* <MyAvatars></MyAvatars> */}
          {/* <Cards></Cards> */}
        </SmartDrawer>
      </DesktopOnly>
    </>
  )
}
