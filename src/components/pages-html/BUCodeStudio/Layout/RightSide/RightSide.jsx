import { BottomSection } from './BottomSection'
import { TopSection } from './TopSection'

export function RightSide({ width = '225px' }) {
  return (
    <div className='h-full bg-white' style={{ width: width }}>
      <TopSection height='calc(100% - 200px * 1)'>
        <iframe className='w-full h-full' src={'/admin/apps/run'}></iframe>
      </TopSection>
      <BottomSection height='200px'></BottomSection>
    </div>
  )
}
