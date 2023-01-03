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
  const confirm = useConfirm()

  let ref = useRef()
  let gui = useSnapshot(GUIState)
  let refInput = useRef()
  return (
    <div key={li.oid} className='flex items-center mb-2'>
      <div>
        <span
          style={{
            width: `160px`,
          }}
          onClick={async (ev) => {
            let obj = SiteStateData.pages.find((e) => e.oid === li.oid)
            obj.slug = ''
            refInput.current.innerText = ''
            refInput.current.value = ''
            ev.target.innerText = 'Saving'
            await updatePageHandler({ object: obj, siteID: gui.siteID })
            ev.target.innerText = 'Set as Home Page'
          }}
          className='inline-flex items-center justify-center h-10 px-2 text-sm bg-purple-200  border-gray-300 cursor-pointer rounded-l-xl'
        >
          Set as Home Page
        </span>

        <span
          style={{ width: '60px' }}
          className={
            'inline-flex whitespace-pre justify-center items-center h-10 px-4 text-sm  border-t border-b border-l border-r border-gray-300 ' +
            `${li.slug === '' ? 'bg-green-300' : 'bg-white'}`
          }
        >
          {li.slug === '' ? '🏡' : '📄'}
        </span>

        <input
          style={{
            minWidth: `135px`,
            transform: 'translateY(0.5px)',
          }}
          className='inline-flex items-center h-10 px-2 text-sm bg-white border-t border-b border-r border-gray-300 '
          defaultValue={li.slug}
          onInput={(ev) => {
            let name = ev.target.value
            let obj = SiteStateData.pages.find((e) => e.oid === li.oid)

            obj.slug = slugify(name, '_')
            ref.current.innerText = 'Save to Rename Page'
            //
          }}
          ref={refInput}
        ></input>

        <span
          ref={ref}
          style={{
            minWidth: `80px`,
          }}
          onClick={async (ev) => {
            refInput.current.value = slugify(li.slug)
            ev.target.innerText = 'Saving'
            await updatePageHandler({ object: li, siteID: gui.siteID })
            ev.target.innerText = 'Rename'
          }}
          className='inline-flex items-center justify-center h-10 px-2 text-sm bg-green-200 border-t border-b border-r border-gray-300 cursor-pointer'
        >
          Rename
        </span>

        {/*  */}
        {/*  */}
        {/*  */}
        <Link href={`/creator-portal/sites/${gui.siteID}/preview/${li.oid}`}>
          <span
            style={{
              width: `70px`,
            }}
            className='inline-flex items-center justify-center  h-10 px-2 text-sm bg-blue-200 border-t border-b border-r border-gray-300 cursor-pointer'
          >
            Edit
          </span>
        </Link>

        <span
          style={{
            minWidth: `80px`,
          }}
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
          className='inline-flex items-center h-10 px-2 text-sm bg-red-200 border-t border-b border-r border-gray-300 cursor-pointer rounded-r-xl'
        >
          Remove
        </span>
      </div>
    </div>
  )
}
