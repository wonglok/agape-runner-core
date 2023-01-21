import { PGBuddyList } from '@/components/pages-html/Home/PGBuddyList/PGBuddyList'
import RedirGateHTML from '@/lib/login/RedirGateHTML'

export default function Avatars() {
  return (
    <RedirGateHTML redirect='/admin/nova-link/monetisation'>
      <PGBuddyList></PGBuddyList>
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
