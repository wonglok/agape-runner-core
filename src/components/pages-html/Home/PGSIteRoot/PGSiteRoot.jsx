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
    ` inline-block w-20 h-20 mr-3 text-xs text-center whitespace-pre bg-white border-2 shadow-xl border-cyan-500 hover:bg-cyan-200 transition-all duration-300 rounded-2xl`

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
                  {/* <Link href={`/admin/pages-and-seo`}>
                    <button
                      className={getClassNames()}
                    >{`Pages\n& SEO`}</button>
                  </Link>
                  <Link href={`/admin/app-store`}>
                    <button className={getClassNames()}>
                      {`Download\nmOS Apps`}
                    </button>
                  </Link>
                  <Link href={`/admin/nova-link`}>
                    <button
                      className={getClassNames()}
                    >{`Discover\nNova Link`}</button>
                  </Link> */}
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
