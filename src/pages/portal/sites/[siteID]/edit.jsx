import { PGSiteDetail } from '@/components/pages-html/Home/SiteDetail/PGSiteDetail'
import RedirGateHTML from '@/lib/login/RedirGateHTML'
import { useRouter } from 'next/router'

export default function Page() {
  let router = useRouter()
  let { siteID } = router.query
  return siteID ? (
    <RedirGateHTML redirect={'/portal/sites/' + siteID + '/edit'}>
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
