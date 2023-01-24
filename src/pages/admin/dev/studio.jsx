import { PGDevStudio } from '@/components/pages-html/Home/PGDevStudio/PGDevStudio'
import RedirGateHTML from '@/lib/login/RedirGateHTML'

export default function Avatars() {
  return (
    <RedirGateHTML redirect='/admin/builders/app-coder'>
      <PGDevStudio></PGDevStudio>
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
