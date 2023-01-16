// import { PGHome } from '@/components/pages-html/Home/Dash/PGHome'
import { ENStudioEditor } from '@/components/ENStudio/ENStudioEditor'
import RedirGateHTML from '@/lib/login/RedirGateHTML'

export default function Avatars() {
  return (
    <RedirGateHTML redirect='/effectnode'>
      {/*  */}
      {/* <AvaLand></AvaLand> */}
      {/* <PGHome></PGHome> */}
      {/*  */}
      <ENStudioEditor></ENStudioEditor>
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
