import Link from 'next/link'
import { useSnapshot } from 'valtio'
import { GUIState } from './GUIState'
import { SiteStateData } from '../aws/SiteState'
import { getFolderEditorURL } from '../aws/folder-aws'
import { useEffect } from 'react'

export function MetaverseFolders({}) {
  let getActiveClass = (className, url) => {
    if (location) {
      return location.pathname === url ? className : ''
    }
  }

  useEffect(() => {
    //
    // fetchAllFolders({}).then(
    //   (data) => {
    //     SiteStateData.folders = data?.list || []
    //   },
    //   async (err) => {
    //     //
    //     console.log(await err)
    //   }
    // )
  }, [])

  //
  let gui = useSnapshot(GUIState)

  // let { data } = useSWR({ siteID: `${gui.siteID}`, reloadID: 0 }, fetchPages)

  // let siteData = useSnapshot(SiteStateData)
  let ss = useSnapshot(SiteStateData)
  return (
    <>
      <li className='w-full mt-4'>
        <h6 className='pl-6 ml-2 text-xs font-bold leading-tight uppercase opacity-60'>
          Metaverse Folders
        </h6>
      </li>

      {(ss?.folders || []).map((item) => {
        //
        return (
          <li key={item.oid} className='w-full ml-5 mt-0.5'>
            <Link href={getFolderEditorURL(item)}>
              <div className='flex items-center px-4 mx-4 my-0 text-sm cursor-pointer hover:underline underline-offset-4 py-2.7 ease-nav-brand whitespace-nowrap transition-colors'>
                <svg
                  width='24'
                  height='24'
                  xmlns='http://www.w3.org/2000/svg'
                  fillRule='evenodd'
                  clipRule='evenodd'
                  className='rounded-full shadow-lg shadow-cyan-200 fill-slate-800'
                >
                  <path d='M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm-3 5.753l6.44 5.247-6.44 5.263.678.737 7.322-6-7.335-6-.665.753z' />
                </svg>
                <span
                  className={
                    'ml-1 opacity-100 pointer-events-none duration-300 ease-soft ' +
                    getActiveClass(
                      'text-slate-700 underline ',
                      getFolderEditorURL(item)
                    )
                  }
                >
                  {item.displayName || 'Untitled Folder'}
                </span>
              </div>
            </Link>
          </li>
        )
      })}
    </>
  )
}
