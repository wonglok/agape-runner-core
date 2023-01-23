/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { GateState } from '@/auth/GateState.ts'
import { useSnapshot } from 'valtio'
import { LeftMenu } from '../Compos/LeftMenu'
import { DesktopOnly } from '@/lib/desktop/DesktopOnly'
import { SectionHeader } from '../Compos/SectionHeader'
import { StylesDashboard } from '../Compos/StylesDashboard'
import { SmartDrawer } from '../Compos/SmartDrawer'
import { AllAppEntry } from './AllAppEntry'
import { useEffect } from 'react'
import { CreateApp } from './CreateApp'
import { AllAppVersions } from './AllAppVersions'
import { useRouter } from 'next/router'

export function PGDeveloper({ content }) {
  //
  let gs = useSnapshot(GateState)

  //
  useEffect(() => {
    //
  }, [])

  //
  return (
    <>
      <DesktopOnly>
        <StylesDashboard></StylesDashboard>
        <LeftMenu></LeftMenu>
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
          <AllAppEntry></AllAppEntry>
          <AllAppVersions></AllAppVersions>

          {/* <MyFolders></MyFolders> */}
        </SmartDrawer>
      </DesktopOnly>
    </>
  )
}

//
