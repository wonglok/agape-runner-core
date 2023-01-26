import { FileTree } from '@/components/pages-html/BUCodeStudio/Implementation/FileTree/FileTree.jsx'
// import { ColumnFiles } from '@/components/pages-html/BUCodeStudio/Implementation/ColumnFiles/ColumnFiles'

export function LeftMenuBar({ width = '225px' }) {
  return (
    <div
      className='h-full text-black bg-white border-r border-cyan-800'
      style={{ width: width }}
    >
      <FileTree></FileTree>
    </div>
  )
}
