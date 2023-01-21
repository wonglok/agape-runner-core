import { PGAppStore } from '@/components/pages-html/Home/PGAppStore/PGAppStore'
import RedirGateHTML from '@/lib/login/RedirGateHTML'

export default function Avatars() {
  return (
    <RedirGateHTML redirect='/admin/meta-os/app-store'>
      <PGAppStore></PGAppStore>
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
