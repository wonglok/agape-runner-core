import { useRef } from 'react'
import { updateOneCodePage } from '../aws/codepage-aws'
import { SiteStateData } from '../aws/SiteState'
import { useSnapshot } from 'valtio'

export function OnePageRecord({ page }) {
  let refURLInput = useRef()
  let thisPage = SiteStateData.codePages?.find((e) => e.oid === page.oid)

  return (
    <>
      {thisPage && (
        <div key={page.oid} className='p-3 m-3 border rounded-lg'>
          <div className='flex mb-3'>
            <button className='inline-flex items-center justify-center px-5 py-2 text-xs bg-blue-200 border border-r-0 border-gray-500 rounded-full rounded-r-none transition-all duration-500 hover:bg-gray-500 hover:text-white'>
              Edit
            </button>
            <button className='inline-flex items-center justify-center px-3 py-2 text-xs bg-purple-300 border border-gray-500 rounded-none transition-all duration-500 hover:bg-gray-500 hover:text-white'>
              Fork
            </button>
            <button className='inline-flex items-center justify-center px-5 py-2 text-xs bg-red-400 border border-l-0 border-gray-500 rounded-full rounded-l-none transition-all duration-500 hover:bg-gray-500 hover:text-white'>
              Delete
            </button>
          </div>
          <div className='flex'>
            <button className='inline-flex items-center justify-center px-4 py-2  text-xs border border-r-0 border-gray-500 rounded-full rounded-r-none transition-all duration-500 hover:bg-gray-500 hover:text-white'>
              Open
            </button>
            <input
              className='inline-flex items-center justify-center w-64 px-3 py-2 text-xs bg-gray-200 border-t border-b border-gray-500 rounded-none transition-all duration-500 hover:bg-gray-500 hover:text-white'
              defaultValue={`${page.slug}`}
              ref={refURLInput}
            ></input>
            <button
              onClick={(ev) => {
                //
                //
                ev.target.classList.add('bg-yellow-300')
                ev.target.innerText = `Loading...`
                thisPage.slug = refURLInput.current.value
                updateOneCodePage({
                  object: thisPage,
                })
                  .then(
                    () => {
                      ev.target.innerText = `Successfully Renamed`
                      ev.target.classList.add('bg-green-300')
                      ev.target.classList.remove('bg-red-300')
                      ev.target.classList.remove('bg-yellow-300')
                    },
                    async (r) => {
                      ev.target.innerText = (await r).reason
                      ev.target.classList.remove('bg-green-300')
                      ev.target.classList.add('bg-red-300')
                      ev.target.classList.remove('bg-yellow-300')
                    }
                  )
                  .finally(() => {
                    //
                    setTimeout(() => {
                      ev.target.classList.remove('bg-green-300')
                      ev.target.classList.remove('bg-red-300')
                      ev.target.classList.remove('bg-yellow-300')

                      ev.target.innerText = `Rename`
                    }, 1000)
                  })
              }}
              className='inline-flex items-center justify-center px-4 py-2 text-xs border border-l-0 border-gray-500 rounded-full rounded-l-none transition-all duration-500 hover:bg-gray-500 hover:text-white'
            >
              Rename
            </button>
          </div>
          {/* <pre>{JSON.stringify(page, null, '  ')}</pre> */}
        </div>
      )}
    </>
  )
}
