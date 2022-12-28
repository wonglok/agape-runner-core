import { useGLBEditor } from '@/helpers/useGLBEditor'
// import { generateUUID } from 'three/src/math/MathUtils'
import { getDirHandle, verifyPermission } from '../FileSystem/FileSystem'

export function AddProjectFolder() {
  let addProjectFolderHandle = useGLBEditor((s) => s.addProjectFolderHandle)
  let loadProjectFolder = useGLBEditor((s) => s.loadProjectFolder)
  return (
    <button
      className='inline-block px-4 py-2 mb-1 mr-1 text-xs bg-teal-200 rounded-full'
      onClick={async () => {
        let handle = await getDirHandle()

        if (handle) {
          await verifyPermission(handle, false)
        }

        if (handle) {
          await addProjectFolderHandle(handle)
          loadProjectFolder()
        }
      }}
    >
      Add New Project Folder
    </button>
  )
}

//
