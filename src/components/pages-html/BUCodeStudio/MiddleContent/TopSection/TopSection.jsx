import { LeftSider } from './LeftSlider'
import { RightCoder } from './RightCoder'

export function TopSection({ height = '225px' }) {
  return (
    <div className='flex w-full' style={{ height: height }}>
      <LeftSider width='180px' />
      <RightCoder width='calc(100% - 180px)'></RightCoder>
    </div>
  )
}
