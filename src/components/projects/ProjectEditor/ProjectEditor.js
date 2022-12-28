// import { useGLBEditor } from '@/helpers/useGLBEditor'
// import { useEffect } from 'react'
import { UIBottomBar } from '../UIBottomBar/UIBottomBar'
import { UIMain } from '../UIMain/UIMain'
import { UITopBar } from '../UITopBar/UITopBar'

export function ProjectEditor({}) {
  // let currentFolder = useGLBEditor((s) => s.currentFolder)
  // useEffect(() => {
  //   //
  //   console.log(currentFolder.handle)
  //   //
  // }, [])
  //
  return (
    <div className='w-full h-full '>
      <UITopBar></UITopBar>
      <UIMain></UIMain>
    </div>
  )
}

//

//
