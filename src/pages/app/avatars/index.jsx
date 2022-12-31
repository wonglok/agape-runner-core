import { PGAvatars } from '@/components/pages-html/Home/MyOwnAvatars/PGAvatars'
import RedirGateHTML from '@/lib/login/RedirGateHTML'

export default function Avatars() {
  return (
    <RedirGateHTML redirect='/app/create-site'>
      {/* <AvaLand></AvaLand> */}
      <PGAvatars></PGAvatars>
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
