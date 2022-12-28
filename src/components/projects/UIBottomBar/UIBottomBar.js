// import { useGLBEditor } from '@/helpers/useGLBEditor'

export function UIBottomBar() {
  // let currentFolder = useGLBEditor((s) => s.currentFolder)

  return (
    <div className='flex items-center justify-between h-6 p-1 px-2 text-xs bg-gray-200'>
      <div className='inline-flex items-center justify-start w-1/2'></div>
      <div className='inline-flex items-center justify-end w-1/2'>
        WebNative 3D Engine
      </div>
    </div>
  )
}
