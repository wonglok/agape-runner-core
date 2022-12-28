import { useGLBEditor } from '@/helpers/useGLBEditor'
import { useCallback, useEffect, useState } from 'react'
import { ENFileNode } from './ENFileNode'

export function ENFiles() {
  let currentFolder = useGLBEditor((s) => s.currentFolder)
  let listFolderItem = useGLBEditor((s) => s.listFolderItem)
  let createWorkspaceFolder = useGLBEditor((s) => s.createWorkspaceFolder)
  let [handle, setHandle] = useState(false)

  let load = useCallback(() => {
    listFolderItem(currentFolder?.handle).then(async (v) => {
      //workspace

      let workspaceEntry = v.find(
        (e) => e.handle.kind === 'directory' && e.handle.name === 'workspace'
      )

      if (workspaceEntry) {
        setHandle(workspaceEntry.handle)
      } else {
        createWorkspaceFolder().then(() => {
          load()
        })
      }
    })
  }, [createWorkspaceFolder, currentFolder?.handle, listFolderItem])

  useEffect(() => {
    if (!currentFolder?.handle) {
      return
    }
    load()
  }, [
    createWorkspaceFolder,
    currentFolder,
    currentFolder?.handle,
    listFolderItem,
    load,
  ])

  return (
    <div>
      {handle ? (
        <ENFileNode handle={handle}></ENFileNode>
      ) : (
        <div
          onClick={() => {
            createWorkspaceFolder().then(load)
          }}
          className='w-32 p-4 m-4 text-white bg-blue-500 rounded-xl'
        >
          Click here to begin
        </div>
      )}

      {/*  */}
    </div>
  )
}

//

//

//

//

//

//
