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
import { PageEdit } from './PageEdit'
import { SiteStateData, reloadPages } from '../aws/SiteState'
import { useSnapshot } from 'valtio'

export function PGPageDetail({ siteID, pageID }) {
  let [site, setSite] = useState(false)
  let siteData = useSnapshot(SiteStateData)

  useEffect(() => {
    if (!siteID) {
      return
    }
    siteGet({ oid: siteID })
      //
      .then((data) => {
        //
        setSite(data.item)
      })
  }, [siteID])

  useEffect(() => {
    if (!siteID) {
      return
    }
    reloadPages({ siteID: siteID })
  }, [siteID])

  useEffect(() => {
    SiteStateData.page = (siteData.pages || []).find((e) => e.oid === pageID)
  }, [pageID, siteData.pages])

  //
  // console.log(siteID)
  //

  return (
    <>
      <DesktopOnly>
        {/*  */}
        <StylesDashboard></StylesDashboard>

        <LeftMenu siteID={siteID}></LeftMenu>

        {/*  */}
        {!siteData.page && (
          <SmartDrawer className=''>
            <SectionHeader
              title={`Edit Page`}
              subTitle={`Loading....`}
              bgImage='/img/blue-green.svg'
              bgOffsetY={50}
              // bar={<div>{/*  */}</div>}
            ></SectionHeader>
          </SmartDrawer>
        )}

        {/*  */}

        {siteData.page && (
          <SmartDrawer className=''>
            {
              <>
                {/*  */}
                <SectionHeader
                  title={`${siteData.page.slug}`}
                  subTitle={
                    <a
                      className='text-sm underline normal-case'
                      target={'_blank'}
                      href={`${getURLFromSiteSlug(site.slug)}`}
                      rel='noreferrer'
                    >
                      {getURLFromSiteSlug(site.slug)}
                    </a>
                  }
                  bgImage={`/img/blue-pink.svg`}
                  bgOffsetY={50}
                  // bar={<div></div>}
                ></SectionHeader>
                {/*  */}
                <div className='h-6'></div>
                <PageEdit></PageEdit>
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
