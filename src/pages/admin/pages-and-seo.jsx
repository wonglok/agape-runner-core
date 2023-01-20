import { PGPagesSEO } from '@/components/pages-html/Home/PGPagesSEO/PGPagesSEO'
import RedirGateHTML from '@/lib/login/RedirGateHTML'

export default function Avatars() {
  return (
    <RedirGateHTML redirect='/admin/pages-and-seo'>
      <PGPagesSEO></PGPagesSEO>
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
