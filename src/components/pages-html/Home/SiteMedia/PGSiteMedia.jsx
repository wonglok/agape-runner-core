/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
// import { GateState } from '@/auth/GateState.ts'
// import { useSnapshot } from 'valtio'
import { LeftMenu } from '../Compos/LeftMenu'
import { DesktopOnly } from '@/lib/desktop/DesktopOnly'
import { SectionHeader } from '../Compos/SectionHeader'
import { StylesDashboard } from '../Compos/StylesDashboard'
import { SmartDrawer } from '../Compos/SmartDrawer'
import { useState } from 'react'
import { useEffect } from 'react'
import { getURLFromSiteSlug, siteGet } from '../aws/site-aws'
import { SiteMediaSection } from './SiteMediaSection'

export function PGSiteMedia({ siteID }) {
  let [site, setSite] = useState(() => {
    return false
  })

  //
  useEffect(() => {
    if (!siteID) {
      return
    }
    siteGet({ oid: siteID }).then((data) => {
      setSite(data.item)
    })
  }, [siteID])

  return (
    <>
      <DesktopOnly>
        <StylesDashboard></StylesDashboard>

        <LeftMenu siteID={siteID}></LeftMenu>

        {!site && (
          <SmartDrawer className=''>
            <SectionHeader
              root={`Media Library`}
              title={`Materaverse Site Editor`}
              subTitle={`Loading....`}
              bgImage='/img/blue-green.svg'
              bgOffsetY={50}
              // bar={<div>{/*  */}</div>}
            ></SectionHeader>
          </SmartDrawer>
        )}

        {site && (
          <SmartDrawer className=''>
            {
              <>
                {/*  */}
                <SectionHeader
                  // title={`${site.slug}`}
                  // subTitle={`Media Library`}
                  // bgImage='/img/blue-green.svg'
                  // bgOffsetY={50}
                  // bar={
                  //   <div>
                  //     {/*  */}
                  //     {/*  */}
                  //   </div>
                  // }
                  //
                  root={`Materaverse Site Editor`}
                  title={`Media Library`}
                  subTitle={`My Uploads, PDFs, 3D Files and more...`}
                  bgImage='/img/blue-green.svg'
                  bgOffsetY={50}
                  bar={<div>{/*  */}</div>}
                ></SectionHeader>
                {/*  */}
                {/*  */}
                <div className='h-6'></div>
                <SiteMediaSection></SiteMediaSection>

                {/*  */}
                {/*  */}
                {/*  */}
                {/* <DomainMapping siteID={siteID}></DomainMapping>
                <SitePagesManager siteID={siteID}></SitePagesManager> */}
                {/*  */}
              </>
            }
          </SmartDrawer>
        )}

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
