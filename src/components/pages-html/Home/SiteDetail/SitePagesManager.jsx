import { useSnapshot } from 'valtio'
import { GUIState } from '../Compos/GUIState'
import { CreateOnePage } from './CreateOnePage'
// import useSWR from 'swr'
import Link from 'next/link'
import { removePage, updatePage } from '../aws/page-aws'
import { useConfirm } from 'material-ui-confirm'
import { SiteStateData, reloadPages } from '../aws/SiteState'
import { useEffect, useRef } from 'react'
import slugify from 'slugify'

export function SitePagesManager() {
  const confirm = useConfirm()
  let gui = useSnapshot(GUIState)
  let siteData = useSnapshot(SiteStateData)

  useEffect(() => {
    reloadPages({ siteID: gui.siteID })
  }, [gui.siteID])

  let tt = useRef(0)

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
            {siteData.pages?.map((li) => {
              return <OnePage key={li.oid} li={li}></OnePage>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

//

let updatePageHandler = async ({ object, siteID }) => {
  await updatePage({ object: object })
  await reloadPages({
    siteID,
  })
}

function OnePage({ li }) {
  let ref = useRef()
  let gui = useSnapshot(GUIState)
  return (
    <div key={li.oid} className='flex items-center mb-2'>
      <div>
        <span className='inline-flex items-center h-10 pl-4 pr-4 text-sm bg-white border-t border-b border-l border-r border-gray-300 rounded-l-xl'>
          /
        </span>
        <input
          style={{
            minWidth: `135px`,
            transform: 'translateY(0.5px)',
          }}
          className='inline-flex items-center h-10 pl-4 pr-4 text-sm bg-white border-t border-b border-r border-gray-300 '
          defaultValue={li.slug}
          onInput={(ev) => {
            let name = ev.target.value
            let obj = SiteStateData.pages.find((e) => e.oid === li.oid)

            obj.slug = slugify(name, '_')

            ref.current.innerText = 'Save to Rename Page'
            //
          }}
        ></input>

        <span
          ref={ref}
          onClick={async (ev) => {
            ev.target.innerText = 'Saving'
            await updatePageHandler({ object: li, siteID: gui.siteID })
            ev.target.innerText = 'Rename'
          }}
          className='inline-flex items-center h-10 pl-4 pr-4 text-sm bg-green-200 border-t border-b border-r border-gray-300 cursor-pointer'
        >
          Rename
        </span>

        {/*  */}
        {/*  */}
        {/*  */}
        <Link href={`/creator-portal/sites/${gui.siteID}/preview/${li.oid}`}>
          <span className='inline-flex items-center h-10 pl-4 pr-4 text-sm bg-blue-200 border-t border-b border-r border-gray-300 cursor-pointer'>
            Edit
          </span>
        </Link>

        <span
          onClick={() => {
            //
            confirm({
              description: `This will permanently delete ${li.slug}.`,
            })
              .then(async () => {
                //
                await removePage({
                  oid: li.oid,
                })
                await reloadPages({ siteID: gui.siteID })
              })
              .catch(() => console.log('Deletion cancelled.'))
          }}
          className='inline-flex items-center h-10 pl-4 pr-4 text-sm bg-red-200 border-t border-b border-r border-gray-300 cursor-pointer rounded-r-xl'
        >
          Remove
        </span>
      </div>
    </div>
  )
}
