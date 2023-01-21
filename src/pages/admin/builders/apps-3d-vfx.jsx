import { PGCreationStudio } from '@/components/pages-html/Home/PGCreationStudio/PGCreationStudio'
import RedirGateHTML from '@/lib/login/RedirGateHTML'

export default function Avatars() {
  return (
    <RedirGateHTML redirect='/admin/builders/design-3d-vfx'>
      <PGCreationStudio></PGCreationStudio>
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
