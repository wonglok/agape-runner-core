import { PGSiteHome } from '@/components/pages-html/Home/PGSiteHome/PGSiteHome'
import RedirGateHTML from '@/lib/login/RedirGateHTML'

export default function Avatars() {
  return (
    <RedirGateHTML redirect='/admin'>
      <PGSiteHome></PGSiteHome>
    </RedirGateHTML>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      title: 'Agape',
    },
  }
}
