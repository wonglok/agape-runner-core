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

export function PGDeveloper({ content }) {
  //
  let gs = useSnapshot(GateState)

  //
  //
  //
  let {
    query: { folderID },
  } = useRouter()

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
                {/*  */}
                <div className='flex items-center w-full h-full'>
                  <button className='inline-block w-20 h-20 mr-3 text-xs bg-white border-2 border-gray-400 shadow-xl rounded-2xl'>
                    Write MetaApp
                  </button>
                </div>
              </>
            }
          ></SectionHeader>
          {/* <MyFolders></MyFolders> */}
        </SmartDrawer>
      </DesktopOnly>
    </>
  )
}

//

//
