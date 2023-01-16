// import { PGHome } from '@/components/pages-html/Home/Dash/PGHome'
import { CreationDetails } from '@/components/pages-html/Home/CreationDetails/CreationDetails'
import RedirGateHTML from '@/lib/login/RedirGateHTML'
import { useRouter } from 'next/router'

export default function Avatars({}) {
  //
  let {
    query: { folderID },
  } = useRouter()

  //
  return (
    <RedirGateHTML redirect={`/admin/folders/${folderID}`}>
      <CreationDetails></CreationDetails>
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
