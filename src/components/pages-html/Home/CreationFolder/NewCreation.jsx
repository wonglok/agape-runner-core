import { useRef } from 'react'
import { folderCreate } from '../aws/folder-aws'
// import { useEffect, useState } from 'react'

export function NewCreation() {
  //
  let newNameRef = useRef()

  //

  return (
    <div className='pb-1'>
      <h6 className='mb-1 text-xl'>Create New Folder</h6>

      <p className='pb-2 '>
        <input
          ref={newNameRef}
          className='mr-3 bg-transparent border-b border-black appearance-none'
          type={'text'}
          placeholder='New name'
        ></input>

        <button
          onClick={async () => {
            //
            let displayName = newNameRef.current.value

            // - folder removed
            let yo = await folderCreate({ displayName: displayName })

            console.log(yo)
            //
            // console.log()
          }}
          className='px-4 py-2 text-xs text-white bg-blue-500 rounded-2xl'
        >
          Create
        </button>
      </p>
    </div>
  )
}
