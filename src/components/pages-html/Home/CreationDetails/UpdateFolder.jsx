import { useRef } from 'react'
import {
  fetchAllFolders,
  fetchOneFolder,
  removeOneFolder,
  updateOneFolder,
} from '../aws/folder-aws'
import { SiteStateData } from '../aws/SiteState'
import { useRouter } from 'next/router'
// import { useEffect, useState } from 'react'

export function UpdateFolder({ object }) {
  //

  //

  return (
    <div className='pb-1'>
      <UpdateFolderName object={object}></UpdateFolderName>
      <RemoveFolderAndFixResource object={object}></RemoveFolderAndFixResource>
    </div>
  )
}

function UpdateFolderName({ object }) {
  let newNameRef = useRef()
  return (
    <p className='pb-2 mb-3 '>
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

          if (object && object.oid) {
            fetchOneFolder({ oid: object.oid }).then((data) => {
              SiteStateData.folder = data.item
              let idx = SiteStateData.folders.findIndex(
                (s) => s.oid === object.oid
              )
              SiteStateData.folders[idx] = data.item
            })
          }
        }}
        className='px-4 py-2 text-xs text-white bg-blue-500 rounded-2xl'
      >
        Update
      </button>
    </p>
  )
}

function RemoveFolderAndFixResource({ object }) {
  let router = useRouter()
  let inputRef = useRef()
  return (
    <p className='pb-2 mb-3 '>
      <input
        ref={inputRef}
        className='mr-3 bg-transparent border-b border-black appearance-none'
        type={'text'}
        placeholder='type "delete" to confrim'
      ></input>

      <button
        onClick={async (ev) => {
          //
          ev.target.innerText = `Loading....`
          let inputText = inputRef.current.value

          if (inputText === 'delete') {
            // - folder removed
            await removeOneFolder({ object })

            fetchAllFolders({}).then((data) => {
              SiteStateData.folders = data.list

              router.push(`/admin`)

              let idx = SiteStateData.folders.findIndex(
                (s) => s.oid === object.oid
              )
              SiteStateData.folders.splice(idx, 1)
              SiteStateData.folders = [...SiteStateData.folders]

              SiteStateData.folder = false

              ev.target.innerText = `Remove Folder and Sub Resource`
            })
          }
        }}
        className='px-4 py-2 text-xs text-white bg-red-500 rounded-2xl'
      >
        Remove Folder and Sub Resource
      </button>
    </p>
  )
}
