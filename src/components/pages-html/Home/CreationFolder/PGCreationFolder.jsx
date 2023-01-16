/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { GateState } from '@/auth/GateState.ts'
import { useSnapshot } from 'valtio'
import { LeftMenu } from '../Compos/LeftMenu'
import { DesktopOnly } from '@/lib/desktop/DesktopOnly'
import { SectionHeader } from '../Compos/SectionHeader'
import { StylesDashboard } from '../Compos/StylesDashboard'
import { SmartDrawer } from '../Compos/SmartDrawer'
import { MyFolders } from './MyFolders'

export function PGCreationFolder({ content }) {
  let gs = useSnapshot(GateState)

  return (
    <>
      <DesktopOnly>
        <StylesDashboard></StylesDashboard>
        <LeftMenu></LeftMenu>
        <SmartDrawer className=''>
          <SectionHeader
            title='My Project Folders'
            subTitle='Metaverse Projects'
            bgImage='/brand/avatar.webp'
            bgOffsetY={15}
            bar={
              <div className='pb-1'>
                <div>123</div>
              </div>
            }
          ></SectionHeader>
          <MyFolders></MyFolders>
        </SmartDrawer>
      </DesktopOnly>
    </>
  )
}

//

//

//