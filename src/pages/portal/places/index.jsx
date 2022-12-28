import { PGPlaces } from '@/components/pages-html/Home/MyOwnPlaces/PGPlaces'
import RedirGateHTML from '@/lib/login/RedirGateHTML'

export default function Avatars() {
  return (
    <RedirGateHTML redirect='/portal/places'>
      {/* <AvaLand></AvaLand> */}
      <PGPlaces></PGPlaces>
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
