/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { GateState } from '@/auth/GateState.ts'
import { useSnapshot } from 'valtio'
import { LeftMenu } from '../Compos/LeftMenu'
import { DesktopOnly } from '@/lib/desktop/DesktopOnly'
import { SectionHeader } from '../Compos/SectionHeader'
import { StylesDashboard } from '../Compos/StylesDashboard'
import { SmartDrawer } from '../Compos/SmartDrawer'
import { useRouter } from 'next/router'
import { AppFolder } from './AppFolder'
import { useEffect } from 'react'
import { CreateApp } from './CreateApp'

export function PGDeveloper({ content }) {
  //
  let gs = useSnapshot(GateState)

  //
  let {
    query: { folderID },
  } = useRouter()

  useEffect(() => {
    //
  }, [])

  //
  return (
    <>
      <DesktopOnly>
        <StylesDashboard></StylesDashboard>
        <LeftMenu folderID={folderID}></LeftMenu>
        <SmartDrawer className=''>
          <SectionHeader
            title='App Developer Studio'
            subTitle='Apps and Procedural VFX'
            bgImage='/brand/pink-yellow.svg'
            bgOffsetY={50}
            bar={
              <>
                <CreateApp />
              </>
            }
          ></SectionHeader>
          <AppFolder></AppFolder>
          {/* <MyFolders></MyFolders> */}
        </SmartDrawer>
      </DesktopOnly>
    </>
  )
}

//
