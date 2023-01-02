import { GUIState } from '@/components/pages-html/Home/Compos/GUIState'
import { PGSiteDetail } from '@/components/pages-html/Home/SiteDetail/PGSiteDetail'
import RedirGateHTML from '@/lib/login/RedirGateHTML'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Page() {
  let router = useRouter()
  let { siteID } = router.query

  GUIState.siteID = siteID

  return siteID ? (
    <RedirGateHTML redirect={'/creator-portal/sites/' + siteID + '/edit'}>
      {/* <AvaLand></AvaLand> */}
      {siteID && <PGSiteDetail siteID={siteID}></PGSiteDetail>}
    </RedirGateHTML>
  ) : null
}

export async function getServerSideProps(context) {
  return {
    props: {
      title: 'Agape',
    },
  }
}
