import { useGLBEditor } from '@/helpers/useGLBEditor'
import { useEffect, useState } from 'react'

import { ENModelViewer } from '../ENModelViewer/ENModelViewer'

export function PreviewerModelGLB({ parent, handle }) {
  let [url, setURL] = useState()
  let openFile = useGLBEditor((s) => s.openFile)

  useEffect(() => {
    //
    setURL(false)
    setTimeout(() => {
      handle.getFile().then((f) => {
        setURL(URL.createObjectURL(f))
      })
    })
  }, [handle])
  //
  return (
    <>
      {/*  */}
      {url && (
        <>
          <div className='h-full border-r' style={{ width: '300px' }}>
            <ENModelViewer url={url} />
          </div>
          <div
            className='flex flex-col items-center justify-center h-full border-r'
            style={{ width: '300px' }}
          >
            <button
              onClick={() => {
                //
                openFile(handle, 'floor')
              }}
              //
              className='inline-block p-2 my-1 text-white bg-blue-500 rounded-lg'
            >
              Open in Editor
            </button>
            {/*  */}
            {/*  */}
            {/* <button
              onClick={() => {
                //
                openFile(handle, 'meta')
              }}
              className='inline-block p-2 my-1 text-white bg-blue-500 rounded-lg'
            >
              Open in 3D World Editor Mode
            </button>

            <button
              onClick={() => {
                //
                openFile(handle, 'avatar')
              }}
              className='inline-block p-2 my-1 text-white bg-blue-500 rounded-lg'
            >
              Open Avatar in Editor
            </button>

            <button
              onClick={() => {
                //
                openFile(handle, 'orbit')
              }}
              className='inline-block p-2 my-1 text-white bg-blue-500 rounded-lg'
            >
              Edit GLB in Orbit Navigation
            </button> */}
          </div>
        </>
      )}
    </>
  )
}
