import { BUCodeStudio } from '@/components/pages-html/BUCodeStudio/BUCodeStudio'
import RedirGateHTML from '@/lib/login/RedirGateHTML'

export default function Page() {
  return (
    <RedirGateHTML redirect='/code'>
      <div className='w-full h-full bg-white'>
        <BUCodeStudio></BUCodeStudio>
      </div>
    </RedirGateHTML>
  )
}
