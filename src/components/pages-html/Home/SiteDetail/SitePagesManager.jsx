import { useSnapshot } from 'valtio'
import { GUIState } from '../Compos/GUIState'
import { CreateOnePage } from './CreateOnePage'
// import useSWR from 'swr'
import Link from 'next/link'
import { removePage, updatePage } from '../aws/page-aws'
import { useConfirm } from 'material-ui-confirm'
import { SiteStateData, reloadPages } from '../aws/SiteState'
import { useEffect } from 'react'

export function SitePagesManager() {
  const confirm = useConfirm()
  let gui = useSnapshot(GUIState)
  let siteData = useSnapshot(SiteStateData)

  useEffect(() => {
    reloadPages({ siteID: gui.siteID })
  }, [gui.siteID])

  let tt = 0
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
              return (
                <div key={li.oid} className='flex items-center mb-2'>
                  <div>
                    <input
                      style={{ minWidth: `135px` }}
                      className='inline-flex items-center h-10 pl-4 pr-4 text-sm bg-white border-t border-b border-l border-r border-gray-300 translate-y-px rounded-l-xl'
                      defaultValue={li.slug}
                      onInput={(ev) => {
                        let obj = SiteStateData.pages.find(
                          (e) => e.oid === li.oid
                        )
                        obj.slug = ev.target.value

                        clearTimeout(tt)
                        tt = setTimeout(async () => {
                          await updatePage({ object: li })
                          await reloadPages({
                            siteID: gui.siteID,
                          })
                        }, 500)
                      }}
                    ></input>
                    {/*  */}
                    {/*  */}
                    {/*  */}
                    <Link
                      href={`/creator-portal/sites/${gui.siteID}/preview/${li.oid}`}
                    >
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
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

//
