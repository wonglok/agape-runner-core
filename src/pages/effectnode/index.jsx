// import { PGHome } from '@/components/pages-html/Home/Dash/PGHome'
import { ENStudio } from '@/components/en-studio/ENStudio'
import RedirGateHTML from '@/lib/login/RedirGateHTML'

export default function Avatars() {
  return (
    <RedirGateHTML redirect='/effectnode'>
      {/* <AvaLand></AvaLand> */}
      {/* <PGHome></PGHome> */}
      <ENStudio></ENStudio>
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
