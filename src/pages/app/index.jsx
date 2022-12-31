import { PGHome } from '@/components/pages-html/Home/Dash/PGHome'
import RedirGateHTML from '@/lib/login/RedirGateHTML'

export default function Avatars() {
  return (
    <RedirGateHTML redirect='/app'>
      {/* <AvaLand></AvaLand> */}
      <PGHome></PGHome>
    </RedirGateHTML>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      title: 'Agape Portal',
    },
  }
}
