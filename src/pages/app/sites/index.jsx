import { PGSites } from '@/components/pages-html/Home/Sites/PGSites'
import RedirGateHTML from '@/lib/login/RedirGateHTML'

export default function Avatars() {
  return (
    <RedirGateHTML redirect='/app/places'>
      {/* <AvaLand></AvaLand> */}
      <PGSites></PGSites>
    </RedirGateHTML>
  )
}

//

export async function getServerSideProps(context) {
  //

  return {
    props: {
      title: 'Agape Portal',
    },
  }
}
