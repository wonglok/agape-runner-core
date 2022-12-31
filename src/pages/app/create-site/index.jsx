import { CreateSite } from '@/components/pages-html/SiteCreation/CreateSite'
import RedirGateHTML from '@/lib/login/RedirGateHTML'

export default function Avatars() {
  return (
    <RedirGateHTML redirect='/app/places'>
      {/* <AvaLand></AvaLand> */}
      <CreateSite></CreateSite>
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
