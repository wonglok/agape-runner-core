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
import { NewCreation } from './NewCreation'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export function PGCreationFolder({ content }) {
  let gs = useSnapshot(GateState)
  let {
    query: { folderID },
  } = useRouter()

  return (
    <>
      <DesktopOnly>
        <StylesDashboard></StylesDashboard>
        <LeftMenu folderID={folderID}></LeftMenu>
        <SmartDrawer className=''>
          <SectionHeader
            title='Metavese Snapshots'
            subTitle='Folders of Versions'
            bgImage='/brand/avatar.webp'
            bgOffsetY={15}
            bar={<NewCreation></NewCreation>}
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
