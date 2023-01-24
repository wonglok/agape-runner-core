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
import { AllAppVersions } from './AppVersions'

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
            title='MetaOS App Studio'
            subTitle='Where dreams and code happens'
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
          <AllAppVersions></AllAppVersions>

          {/* <MyFolders></MyFolders> */}
        </SmartDrawer>
      </DesktopOnly>
    </>
  )
}

//

//
