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

export function PGPageDetail({ siteID, pageID }) {
  let [site, setSite] = useState(false)
  useEffect(() => {
    if (!siteID) {
      return
    }
    siteGet({ _id: siteID })
      //
      .then((data) => {
        //
        setSite(data.item)
      })
  }, [siteID])

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
        {!site && (
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
        {site && (
          <SmartDrawer className=''>
            {
              <>
                {/*  */}
                <SectionHeader
                  title={`Page: ${site.slug}`}
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
                  bgImage='/img/blue-green.svg'
                  bgOffsetY={50}
                  bar={
                    <div>
                      {/*  */}

                      {/*  */}
                    </div>
                  }
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

//

//

//
