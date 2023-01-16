import { useRef } from 'react'
import { fetchOneFolder, updateOneFolder } from '../aws/folder-aws'
import { SiteStateData } from '../aws/SiteState'
// import { useEffect, useState } from 'react'

export function UpdateFolder({ object }) {
  //

  //

  return (
    <div className='pb-1'>
      <h6 className='mb-1 text-xl'>Update Title</h6>
      <UpdateFolderName object={object}></UpdateFolderName>
    </div>
  )
}

function UpdateFolderName({ object }) {
  let newNameRef = useRef()
  return (
    <p className='pb-2 '>
      <input
        ref={newNameRef}
        defaultValue={object.displayName}
        className='mr-3 bg-transparent border-b border-black appearance-none'
        type={'text'}
        placeholder='New name'
      ></input>

      <button
        onClick={async () => {
          //
          let displayName = newNameRef.current.value
          object.displayName = displayName
          // - folder removed
          await updateOneFolder({ object })

          fetchOneFolder({ oid: object.oid }).then((data) => {
            SiteStateData.folder = data.item
            let idx = SiteStateData.folders.findIndex(
              (s) => s.oid === object.oid
            )
            SiteStateData.folders[idx] = data.item
          })
        }}
        className='px-4 py-2 text-xs text-white bg-blue-500 rounded-2xl'
      >
        Update
      </button>
    </p>
  )
}
