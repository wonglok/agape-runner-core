// import { PGHome } from '@/components/pages-html/Home/Dash/PGHome'
import { PGCreationFolder } from '@/components/pages-html/Home/CreationFolder/PGCreationFolder'
import RedirGateHTML from '@/lib/login/RedirGateHTML'

export default function Avatars() {
  return (
    <RedirGateHTML redirect='/admin'>
      <PGCreationFolder></PGCreationFolder>
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
