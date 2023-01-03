import { useSnapshot } from 'valtio'
import { GUIState } from '../Compos/GUIState'
import { useEffect, useState } from 'react'
import { SESSION_ACCESS_KEY, UserEndPoints } from '@/auth/GateConst'
import LoadingDots from '../Domains/components/loading-dots'
import { reloadPages } from '../aws/SiteState'

export function CreateOnePage({}) {
  let gui = useSnapshot(GUIState)

  const [pageSlug, setSlug] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [adding, setAdding] = useState(false)

  // const [error, setError] = useState(null)

  // useEffect(() => {
  //   if (pageSlug.length == 0) {
  //     setDisabled(true)
  //   } else {
  //     setDisabled(false)
  //   }
  // }, [pageSlug])

  //
  useEffect(() => {
    if (adding) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [adding])

  //
  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          //
          setAdding(true)
          //
          try {
            let sToken = localStorage.getItem(SESSION_ACCESS_KEY)

            if (!sToken) {
              throw new Error('no sToken')
            }

            let ep = UserEndPoints[process.env.NODE_ENV]

            let res = await fetch(`${ep}/site-page-create`, {
              method: 'POST',
              mode: 'cors',
              body: JSON.stringify({
                //
                slug: pageSlug,
                siteID: gui.siteID,
                seo: {
                  slug: pageSlug,
                },
                sToken: sToken,
              }),
              headers: {
                Authorization: `Bearer ${sToken}`,
              },
            })

            let result = await res.json()

            await reloadPages({ siteID: gui.siteID })
            document.querySelector('#createonepage').value = ''
          } catch (error) {
            alert(error.message)
          } finally {
            setAdding(false)
            setDisabled(false)
          }
        }}
        //
        //
        className='flex items-center justify-start w-full h-20 max-w-2xl'
      >
        <span className='inline-flex items-center h-10 pl-4 pr-4 border  border-gray-300 rounded-l-xl'>
          /
        </span>
        <input
          type='text'
          name='page'
          id='createonepage'
          onInput={(e) => {
            setSlug(e.target.value)
          }}
          autoComplete='off'
          placeholder='about-page'
          className='h-10 min-w-0 px-4 mr-3 border-t border-b border-r border-gray-300 rounded-r-xl focus:ring-0 focus:oultine-none focus:border-black sm:text-sm'
        />
        <button
          type='submit'
          disabled={disabled}
          className={`${
            disabled
              ? 'cursor-not-allowed bg-gray-100 text-gray-500 border-gray-300'
              : 'bg-black text-white border-black hover:text-black hover:bg-white'
          } py-2 w-28 text-sm border-solid border rounded-md focus:outline-none transition-all ease-in-out duration-150`}
        >
          {adding ? <LoadingDots /> : 'Add'}
        </button>
      </form>

      {/* {gui.siteID} */}
      {/*  */}
      {/*  */}
    </div>
  )
}
