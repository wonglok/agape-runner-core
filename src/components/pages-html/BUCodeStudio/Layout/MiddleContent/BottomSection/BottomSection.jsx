import { ColumnFiles } from '@/components/pages-html/BUCodeStudio/Implementation/ColumnFiles/ColumnFiles'

export function BottomSection({ height = '225px' }) {
  return (
    <div className='w-full border-t border-cyan-800' style={{ height: height }}>
      <ColumnFiles></ColumnFiles>
    </div>
  )
}
