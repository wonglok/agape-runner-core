import { BUCodeStudio } from '@/components/pages-html/BUCodeStudio/BUCodeStudio'
import RedirGateHTML from '@/lib/login/RedirGateHTML'
import { useRouter } from 'next/router'

export default function Page() {
  let router = useRouter()
  let appVersionID = router?.query?.appVersionID || ''
  return appVersionID ? (
    <RedirGateHTML redirect={`/code/${appVersionID}`}>
      <div className='w-full h-full bg-white'>
        <BUCodeStudio></BUCodeStudio>
      </div>
    </RedirGateHTML>
  ) : null
}
