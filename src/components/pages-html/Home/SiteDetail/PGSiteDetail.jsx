/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { GateState } from '@/auth/GateState.ts'
import { useSnapshot } from 'valtio'
import { LeftMenu } from '../Compos/LeftMenu'
import { DesktopOnly } from '@/lib/desktop/DesktopOnly'
import { SectionHeader } from '../Compos/SectionHeader'
import { StylesDashboard } from '../Compos/StylesDashboard'
import { SmartDrawer } from '../Compos/SmartDrawer'
import { useState } from 'react'
import { useEffect } from 'react'
import { siteGet } from '../aws/site-aws'

export function PGSiteDetail({ siteID }) {
  //
  let gs = useSnapshot(GateState)

  //

  let [site, setSite] = useState(false)
  useEffect(() => {
    if (!siteID) {
      return
    }
    siteGet({ _id: siteID }).then((value) => {
      //
      console.log(value)
      //
    })
  }, [siteID])

  //
  console.log(siteID)

  return (
    <>
      <DesktopOnly>
        {/*  */}
        {/*  */}

        <StylesDashboard></StylesDashboard>
        <LeftMenu></LeftMenu>
        <SmartDrawer className=''>
          <SectionHeader
            title='Site Detail'
            subTitle='My Detail'
            bgImage='/scene/2022-11-28-NYC/coverimage/circle_portal.png'
            bgOffsetY={50}
            bar={<div>{/*  */}</div>}
          ></SectionHeader>
        </SmartDrawer>
        {/*  */}
        {/*  */}
        {/*  */}
      </DesktopOnly>
    </>
  )
}

//

//

//

//

//

//
