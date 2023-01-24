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
import { AllAppContent } from './AllAppContent'

export function PGSiteHome({ content }) {
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
          {/*  */}
          <SectionHeader
            // root='Metaverse Portal'
            // subRoot='Dashboard'
            title='3D WebApps MetaOS'
            subTitle='Tips: How to create your own Metaverse?'
            bgImage='/brand/pink-yellow.svg'
            bgOffsetY={50}
            bar={
              <>
                <div className='mb-1 text-sm'></div>
                <div className='flex items-center h-full'>
                  <div className='inline-flex items-center justify-center w-48 h-20 px-4 mr-3 text-xs bg-white border border-gray-400 shadow-xl rounded-xl'>
                    {`1. Create a New Page like /about-me`}
                  </div>
                  <div className='inline-flex items-center justify-center w-48 h-20 px-4 mr-3 text-xs bg-white border border-gray-400 shadow-xl rounded-xl'>
                    {`2. Download a metaOS App into that page`}
                  </div>
                </div>
              </>
            }
          ></SectionHeader>
          <AllAppEntry></AllAppEntry>
          <AllAppContent></AllAppContent>

          {/* <MyFolders></MyFolders> */}
        </SmartDrawer>
      </DesktopOnly>
    </>
  )
}
