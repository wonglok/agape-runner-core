import { PG3DArtist } from '@/components/pages-html/Home/PG3DArtist/PG3DArtist'
import RedirGateHTML from '@/lib/login/RedirGateHTML'

export default function Avatars() {
  return (
    <RedirGateHTML redirect='/admin/builders/app-coder'>
      <PG3DArtist></PG3DArtist>
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
