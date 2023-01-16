import { useRef } from 'react'
import { createCodePage } from '../aws/codepage-aws'

export function CreateNewPage({ folderID }) {
  let refInputText = useRef()

  return (
    <div className='pb-1'>
      <h6 className='mb-1 text-xl'>Create New Page</h6>

      <p className='pb-2 '>
        <input
          ref={refInputText}
          defaultValue={`new-page-version-001`}
          className='mr-3 bg-transparent border-b border-black appearance-none'
          type={'text'}
          placeholder='about-page-version-001'
        ></input>

        <button
          onClick={async () => {
            //
            let slug = refInputText.current.value

            // - folder removed
            let yo = await createCodePage({ slug: slug, folderID })

            //
          }}
          className='px-4 py-2 text-xs text-white bg-blue-500 rounded-2xl'
        >
          Create
        </button>
      </p>
    </div>
  )
}
//
//
