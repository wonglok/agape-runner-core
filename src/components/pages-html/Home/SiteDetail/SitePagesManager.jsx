import { useSnapshot } from 'valtio'
import { GUIState } from '../Compos/GUIState'
import { CreateOnePage } from './CreateOnePage'
import useSWR from 'swr'
import Link from 'next/link'
import { fetchPages } from '../aws/page-aws'

export function SitePagesManager() {
  let gui = useSnapshot(GUIState)

  let { data, mutate: reloadPages } = useSWR(`${gui.siteID}`, fetchPages)

  return (
    <div className='flex-none w-full max-w-full px-4 mb-4 '>
      <div className='relative flex flex-col min-w-0 mx-2 break-words bg-white border shadow-inner border-slate-400 shadow-slate-200 shadow-soft-xl rounded-2xl bg-clip-border'>
        <div className='p-4 pb-0 mb-0 rounded-t-2xl'>
          <h6 className='mb-1 text-xl'>Pages of Metaverse Experience</h6>
          <p className='mb-3 text-sm leading-normal'>
            You can create different kinds of metaverse experiences.
          </p>

          <div>
            <CreateOnePage reloadPages={reloadPages}></CreateOnePage>
            {/*  */}
          </div>
          <div className='mb-3'>
            {data?.list?.map((li) => {
              return (
                <div key={li._id} className='flex items-center mb-2'>
                  <div>
                    <span
                      style={{ minWidth: `135px` }}
                      className='inline-flex items-center h-10 pl-4 pr-4 text-sm bg-white border-t border-b border-l border-r border-gray-300 rounded-l-xl'
                    >
                      {li.slug}
                    </span>
                    <Link
                      href={`/creator-portal/sites/${gui.siteID}/preview/${li._id}`}
                    >
                      <span className='inline-flex items-center h-10 pl-4 pr-4 text-sm bg-blue-200 border-t border-b border-r border-gray-300 cursor-pointer'>
                        Edit
                      </span>
                    </Link>
                    <span className='inline-flex items-center h-10 pl-4 pr-4 text-sm bg-red-200 border-t border-b border-r border-gray-300 cursor-pointer rounded-r-xl'>
                      Remove
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

//
