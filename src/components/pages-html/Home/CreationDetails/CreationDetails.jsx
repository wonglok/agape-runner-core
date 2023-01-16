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

export function CreationDetails({ content }) {
  let gs = useSnapshot(GateState)

  let [folder, setFolder] = useState(false)
  let {
    query: { folderID },
  } = useRouter()
  useEffect(() => {
    //
    //
    fetchOneFolder({ oid: folderID }).then((data) => {
      setFolder(data.item)
    })
    //
  }, [folderID])
  return (
    <>
      <DesktopOnly>
        <StylesDashboard></StylesDashboard>
        <LeftMenu folderID={folderID}></LeftMenu>
        <SmartDrawer className=''>
          <SectionHeader
            title={folder?.displayName || '...'}
            subTitle='Snapshots Management'
            bgImage='/brand/blue-green-grad.svg'
            bgOffsetY={15}
            bar={<></>}
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
