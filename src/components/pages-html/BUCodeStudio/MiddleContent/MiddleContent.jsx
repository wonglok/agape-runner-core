import { BottomSection } from './BottomSection/BottomSection'
import { TopSection } from './TopSection/TopSection'

export function MiddleContent({ width = '225px' }) {
  return (
    <div className='h-full border-r border-cyan-800' style={{ width: width }}>
      <TopSection height='calc(100% - 200px * 1)'></TopSection>
      <BottomSection height='200px'></BottomSection>
    </div>
  )
}
