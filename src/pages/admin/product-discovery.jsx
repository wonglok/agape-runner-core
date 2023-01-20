import { PGSiteRoot } from '@/components/pages-html/Home/PGSIteRoot/PGSiteRoot'
import RedirGateHTML from '@/lib/login/RedirGateHTML'

export default function Avatars() {
  return (
    <RedirGateHTML redirect='/admin'>
      <PGSiteRoot></PGSiteRoot>
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
