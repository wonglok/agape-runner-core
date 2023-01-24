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
import { AllAppGroup } from './AllAppGroup'
import { ExtendWithVersion } from './ExtendWithVersion'
import { CSData } from '@/aws/CSData'

export function PGDevStudio({ content }) {
  //
  let gs = useSnapshot(GateState)

  let {
    query: { folderID },
  } = useRouter()

  let cs = useSnapshot(CSData)
  //
  return (
    <>
      <DesktopOnly>
        <StylesDashboard></StylesDashboard>
        <LeftMenu folderID={folderID}></LeftMenu>
        <SmartDrawer className=''>
          <SectionHeader
            title='MetaOS App'
            subTitle='Where Dream and Cod Happens'
            bgImage='/brand/pink-yellow.svg'
            bgOffsetY={50}
            bar={
              <>
                <div className='flex items-center w-full h-full'>
                  {/* <button className='inline-block w-20 h-20 mr-3 text-xs bg-white border-2 border-gray-400 shadow-xl rounded-2xl'>
                    Import GLB
                  </button>
                  <button className='inline-block w-20 h-20 mr-3 text-xs bg-white border-2 border-gray-400 shadow-xl rounded-2xl'>
                    Scnee Composition
                  </button> */}
                </div>
              </>
            }
          ></SectionHeader>
          <AllAppGroup></AllAppGroup>

          <div className='flex-none w-full max-w-full px-4 mt-4 mb-6'>
            <div className='relative flex flex-col min-w-0 mx-2 break-words bg-white border shadow-inner border-slate-400 shadow-slate-200 shadow-soft-xl rounded-2xl bg-clip-border'>
              <div className='p-4 pb-0 mb-0 rounded-t-2xl'>
                <h6 className=' mb-3 text-xl'>World Versions</h6>
                {cs.appGroupID && (
                  <ExtendWithVersion
                    appGroupID={cs.appGroupID}
                  ></ExtendWithVersion>
                )}
              </div>
            </div>
          </div>

          {/* <MyFolders></MyFolders> */}
        </SmartDrawer>
      </DesktopOnly>
    </>
  )
}

//

//
