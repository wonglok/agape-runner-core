// import Link from 'next/link'
import { useEffect } from 'react'
// import { useState } from 'react'
// import { siteRecent } from '../aws/site-aws'
// import { OneCard } from '../Compos/OneCard'
// import { fetchAllFolders } from '../aws/folder-aws'
import { useSnapshot } from 'valtio'
import { SiteStateData } from '../aws/SiteState'

/* eslint-disable @next/next/no-img-element */
export function MyPages() {
  let ss = useSnapshot(SiteStateData)

  useEffect(() => {
    // fetchAllFolders({
    //   //
    // }).then((data) => {
    //   //
    //   SiteStateData.folders = data?.list || []
    // })
    // siteRecent({}).then(
    //   (data) => {
    //     // console.log(data)
    //   },
    //   (err) => {
    //     console.error(err)
    //   }
    // )
  }, [ss])
  return (
    <div className='flex-none w-full max-w-full px-4 mt-9'>
      <div className='relative flex flex-col min-w-0 mx-2 mb-6 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border'>
        <div className='p-4 pb-0 mb-0 bg-white rounded-t-2xl'>
          <h6 className='mb-1 text-xl'>Metaverse Snapshots</h6>
          <p className='mb-3 text-sm leading-normal'>Snapshot URLs</p>
        </div>
        {/*  */}
        {/*  */}
        {/*  */}
        <div className='p-4'>
          <div className='text-sm'>12345 12345 12345</div>
          <div className='text-sm'>12345 12345 12345</div>
          <div className='text-sm'>12345 12345 12345</div>
          <div className='text-sm'>12345 12345 12345</div>
          <div className='text-sm'>12345 12345 12345</div>
        </div>
      </div>
    </div>
  )
}

//
//
//

//
//
//
