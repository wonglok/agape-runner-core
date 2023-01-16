import { useRef } from 'react'
import { createCodePage, fetchAllCodePageInFolder } from '../aws/codepage-aws'
import { SiteStateData } from '../aws/SiteState'

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
          onClick={async (ev) => {
            //
            if (!folderID) {
              throw new Error('lack folderID')
            }
            let slug = refInputText.current.value
            //
            ev.target.innerText = 'Loading...'
            ev.target.classList.add('bg-yellow-500')
            ev.target.classList.remove('bg-red-500')
            ev.target.classList.remove('bg-blue-500')

            try {
              let yo = await createCodePage({ slug: slug, folderID })
            } catch (e) {
              console.log(e)

              if (e === 'taken') {
                ev.target.innerText = 'Taken'
                ev.target.classList.remove('bg-yellow-500')
                ev.target.classList.add('bg-red-500')
                ev.target.classList.remove('bg-blue-500')
              }
            } finally {
              console.log('finally createCodePage')

              setTimeout(() => {
                ev.target.innerText = 'Create'
                ev.target.classList.remove('bg-yellow-500')
                ev.target.classList.remove('bg-red-500')
                ev.target.classList.add('bg-blue-500')
              }, 1000)

              fetchAllCodePageInFolder({ folderID }).then((data) => {
                SiteStateData.codePages = data?.list || []
              })
            }
            // - folder removed

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
