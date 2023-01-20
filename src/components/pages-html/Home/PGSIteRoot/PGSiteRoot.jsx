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

export function PGSiteRoot({ content }) {
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
            title='Dashboard'
            subTitle='Metaverse Control Center'
            bgImage='/brand/blue-green-grad.svg'
            bgOffsetY={50}
            bar={
              <>
                <div className='flex items-center h-full'>
                  <button className='inline-block w-20 h-20 mr-3 text-xs text-center whitespace-pre bg-white border-2 border-gray-400 shadow-xl rounded-2xl'>
                    {`Pages\n & SEO`}
                  </button>
                  <button className='inline-block w-20 h-20 mr-3 text-xs text-center whitespace-pre bg-white border-2 border-gray-400 shadow-xl rounded-2xl'>
                    {`Download\nmOS Apps`}
                  </button>
                  <button className='inline-block w-20 h-20 mr-3 text-xs text-center whitespace-pre bg-white border-2 border-gray-400 shadow-xl rounded-2xl'>
                    {`Develop\nmOS Apps`}
                  </button>
                  <button className='inline-block w-20 h-20 mr-3 text-xs text-center whitespace-pre bg-white border-2 border-gray-400 shadow-xl rounded-2xl'>
                    {`Design\n 3D Art \n & VFX`}
                  </button>
                  <button className='inline-block w-20 h-20 mr-3 text-xs text-center whitespace-pre bg-white border-2 border-gray-400 shadow-xl rounded-2xl'>
                    {`Discover\nNova Link`}
                  </button>
                </div>
                {/*  */}
                {/* <NewCreation></NewCreation> */}
                {/*  */}
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
