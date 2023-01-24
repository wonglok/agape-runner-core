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
import Link from 'next/link'

export function PGSiteRoot({ content }) {
  //
  let gs = useSnapshot(GateState)

  //
  let {
    query: { folderID },
  } = useRouter()

  let getClassNames = () =>
    ` inline-block w-20 h-20 mr-3 p-2 text-xs text-center bg-white border-2 shadow-xl border-cyan-500 hover:bg-cyan-200 transition-all duration-300 rounded-2xl`

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
                {/*  */}
                <div className='flex items-center h-full'>
                  <Link href={`/admin/meta-os/site-seo`}>
                    <button
                      className={getClassNames()}
                    >{`Download MetaOS App`}</button>
                  </Link>
                  <Link href={`/admin/meta-os/site-seo`}>
                    <button
                      className={getClassNames()}
                    >{`Write an MetaOS App`}</button>
                  </Link>
                </div>
                {/*  */}
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
