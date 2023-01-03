import { GUIState } from '@/components/pages-html/Home/Compos/GUIState'
import { PGPageDetail } from '@/components/pages-html/Home/PageDetail/PGPageDetail'
// import { PGSiteDetail } from '@/components/pages-html/Home/SiteDetail/PGSiteDetail'
import { reloadPages } from '@/components/pages-html/Home/aws/SiteState'
import RedirGateHTML from '@/lib/login/RedirGateHTML'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Page() {
  //
  let router = useRouter()
  let { siteID, pageID } = router.query

  //
  GUIState.pageID = pageID
  GUIState.siteID = siteID

  //
  return siteID ? (
    <RedirGateHTML redirect={'/creator-portal/sites/' + siteID + '/edit'}>
      {/* <AvaLand></AvaLand> */}
      {siteID && <PGPageDetail siteID={siteID} pageID={pageID}></PGPageDetail>}
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

//

//

//

//
