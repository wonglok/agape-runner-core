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

export function PGPagesSEO({ content }) {
  //
  let gs = useSnapshot(GateState)

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
            title='Pages & SEO'
            subTitle='Associate Metaverse with Pages'
            bgImage='/brand/pink-yellow.svg'
            bgOffsetY={50}
            bar={
              <>
                <div className='flex items-center h-full'>
                  <button className='inline-block w-20 h-20 mr-3 text-xs bg-white border-2 border-gray-400 shadow-xl rounded-2xl'>
                    + New Page
                  </button>
                </div>
              </>
            }
          ></SectionHeader>
          {/*  */}
          {/* <MyFolders></MyFolders> */}
        </SmartDrawer>
      </DesktopOnly>
    </>
  )
}

//

//
