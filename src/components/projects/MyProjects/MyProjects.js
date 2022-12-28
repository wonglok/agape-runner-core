// import { useEffect, useRef } from 'react'
// import { dragOverElem } from '../FileSystem/FileSystem'

import { useGLBEditor } from '@/helpers/useGLBEditor'
import Router from 'next/router'
import { useEffect } from 'react'

export function MyProjects() {
  // let ref = useRef()
  // useEffect(() => {
  //   return dragOverElem(ref.current)
  // }, [ref])

  let projectFolders = useGLBEditor((s) => s.projectFolders)
  let removeProjectFolderByID = useGLBEditor((s) => s.removeProjectFolderByID)
  let loadProjectFolder = useGLBEditor((s) => s.loadProjectFolder)
  let requestPermission = useGLBEditor((s) => s.requestPermission)
  useEffect(() => {
    if (projectFolders.length === 0) {
      loadProjectFolder()
    }
  }, [loadProjectFolder, projectFolders])
  //
  return (
    <div>
      {projectFolders
        .filter((e) => e)
        .map((e, i) => {
          return (
            <div key={e._id}>
              <div className='inline-block px-8 py-1 mb-1 mr-1 border-b border-gray-500'>
                {e.handle?.name}
              </div>
              <button
                onClick={async () => {
                  let handle = e.handle
                  if (handle) {
                    await requestPermission(handle, true)
                  }
                  Router.router.push(`/project/edit/${e._id}`)
                }}
                className='inline-block px-4 py-1 mb-1 mr-1 bg-blue-200'
              >
                Open
              </button>
              <button
                onClick={async () => {
                  if (window.confirm('remove?')) {
                    await removeProjectFolderByID(e._id)
                    loadProjectFolder()
                  }
                }}
                className='inline-block px-4 py-1 mb-1 mr-1 bg-red-200'
              >
                Remove Shortcut
              </button>
            </div>
          )
        })}

      {/* <button
        onClick={() => {
          //
          getHandle()
        }}
      >
        Click
      </button> */}
      {/* <div ref={ref} className='w-full h-32 bg-gray-200'></div> */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
    </div>
  )
}
