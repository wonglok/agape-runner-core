import { GUIState } from '@/components/pages-html/Home/Compos/GUIState'
import { PGSiteMedia } from '@/components/pages-html/Home/SiteMedia/PGSiteMedia'
import { reloadPages } from '@/components/pages-html/Home/aws/SiteState'
import RedirGateHTML from '@/lib/login/RedirGateHTML'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Page() {
  let router = useRouter()
  let { siteID } = router.query

  GUIState.siteID = siteID

  useEffect(() => {
    if (!siteID) {
      return
    }
    reloadPages({ siteID: siteID })
  }, [siteID])

  return siteID ? (
    <RedirGateHTML redirect={'/creator-portal/sites/' + siteID + '/edit'}>
      {/* <AvaLand></AvaLand> */}
      {siteID && <PGSiteMedia siteID={siteID}></PGSiteMedia>}
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

// import { PGSiteMedia } from '@/components/pages-html/Home/SiteMedia/PGSiteMedia'
// import RedirGateHTML from '@/lib/login/RedirGateHTML'

// export default function Page() {
//   return (
//     <RedirGateHTML redirect='/creator-portal/sites'>
//       {/* <AvaLand></AvaLand> */}
//       <PGSiteMedia></PGSiteMedia>
//     </RedirGateHTML>
//   )
// }

// export async function getServerSideProps(context) {
//   return {
//     props: {
//       title: 'Agape',
//     },
//   }
// }
