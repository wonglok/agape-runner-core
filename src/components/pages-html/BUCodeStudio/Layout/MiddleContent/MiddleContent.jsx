import { LeftSider } from './VerticalSection/LeftSlider'
import { RightCoder } from './VerticalSection/RightCoder'

export function MiddleContent({ width = '225px' }) {
  return (
    <div
      className='flex h-full border-r border-cyan-800'
      style={{ width: width }}
    >
      <LeftSider width='180px' />
      <RightCoder width='calc(100% - 180px)'></RightCoder>
    </div>
  )
}
