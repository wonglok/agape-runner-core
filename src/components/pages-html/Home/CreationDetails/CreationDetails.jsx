/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { GateState } from '@/auth/GateState.ts'
import { useSnapshot } from 'valtio'
import { LeftMenu } from '../Compos/LeftMenu'
import { DesktopOnly } from '@/lib/desktop/DesktopOnly'
import { SectionHeader } from '../Compos/SectionHeader'
import { StylesDashboard } from '../Compos/StylesDashboard'
import { SmartDrawer } from '../Compos/SmartDrawer'
import { useEffect, useState } from 'react'
import { fetchOneFolder } from '../aws/folder-aws'
import { useRouter } from 'next/router'
import { MyPages } from './MyPages'
import { UpdateFolder } from './UpdateFolder'
import { SiteStateData } from '../aws/SiteState'

export function CreationDetails({ content }) {
  let gs = useSnapshot(GateState)
  let ssd = useSnapshot(SiteStateData)
  let {
    query: { folderID },
  } = useRouter()
  useEffect(() => {
    if (!folderID) {
      return
    }
    //
    //
    fetchOneFolder({ oid: folderID }).then((data) => {
      if (data?.item) {
        SiteStateData.folder = data?.item
      }
    })
    //
  }, [folderID])

  //
  return (
    <>
      <DesktopOnly>
        <StylesDashboard></StylesDashboard>
        <LeftMenu folderID={folderID}></LeftMenu>
        <SmartDrawer className=''>
          <SectionHeader
            title={ssd?.folder?.displayName || '...'}
            subTitle='Snapshots Management'
            bgImage='/brand/blue-green-grad.svg'
            bgOffsetY={15}
            bar={
              <>
                {ssd.folder && (
                  <UpdateFolder object={ssd.folder}></UpdateFolder>
                )}
              </>
            }
          ></SectionHeader>
          <MyPages></MyPages>
        </SmartDrawer>
      </DesktopOnly>
    </>
  )
}

//

//

//

//
