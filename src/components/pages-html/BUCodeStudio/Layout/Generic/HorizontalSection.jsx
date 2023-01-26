// import { FileTree } from '@/components/pages-html/BUCodeStudio/Implementation/FileTree/FileTree.jsx'

export function HorizontalSection({ border, children, width = '225px' }) {
  return (
    <div
      className={`h-full border-cyan-800 ${border ? 'border-r' : ''}`}
      style={{ width: width }}
    >
      {children}
    </div>
  )
}
