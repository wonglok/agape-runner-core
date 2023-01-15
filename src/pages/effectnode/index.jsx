// import { PGHome } from '@/components/pages-html/Home/Dash/PGHome'
import { ENStudioDir } from '@/components/ENStudio/ENStudioDir'
import RedirGateHTML from '@/lib/login/RedirGateHTML'

export default function Avatars() {
  return (
    <RedirGateHTML redirect='/effectnode'>
      {/* <AvaLand></AvaLand> */}
      {/* <PGHome></PGHome> */}
      <ENStudioDir></ENStudioDir>
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
