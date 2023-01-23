import { PGDeveloper } from '@/components/pages-html/Home/PGDeveloper/PGDeveloper'
import RedirGateHTML from '@/lib/login/RedirGateHTML'

export default function Avatars() {
  return (
    <RedirGateHTML redirect='/admin/builders/app-coder'>
      <PGDeveloper></PGDeveloper>
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
