import Link from 'next/link'
import { useEffect } from 'react'
import { useState } from 'react'
import { siteRecent } from '../aws/site-aws'
import { OneCard } from '../Compos/OneCard'

/* eslint-disable @next/next/no-img-element */
export function AllSites() {
  let [recentSites, setSites] = useState([])

  useEffect(() => {
    siteRecent({}).then(
      (data) => {
        setSites(data.list)
        // console.log(data)
      },
      (err) => {
        console.error(err)
      }
    )
  }, [])
  return (
    <div className='flex-none w-full max-w-full px-4 mt-9'>
      <div className='relative flex flex-col min-w-0 mx-2 mb-6 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border'>
        <div className='p-4 pb-0 mb-0 bg-white rounded-t-2xl'>
          <h6 className='mb-1 text-xl'>Metaverse Sites</h6>
          <p className='mb-3 text-sm leading-normal'>Sites by you</p>
        </div>
        {/*  */}
        {/*  */}
        <div className='flex-auto mx-2'>
          <div className='flex flex-wrap mb-8'>
            <div className='w-full max-w-full px-3 mb-6 cursor-pointer md:w-6/12 md:flex-none xl:mb-0 xl:w-3/12'>
              <Link href={'/portal/create-site'} data-stuff='javascript:;'>
                <div className='relative flex flex-col h-full min-w-0 break-words bg-transparent border border-solid shadow-inner rounded-2xl border-slate-100 bg-clip-border'>
                  <div className='flex flex-col justify-center flex-auto p-6 text-center '>
                    <span>
                      <i className='mb-4 fa fa-plus text-slate-400' />
                      <h5 className='text-slate-400'>New Site</h5>
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {recentSites.map((site) => {
              return <OneCard key={site._id} site={site}></OneCard>
            })}

            {/*  */}
            {/*  */}
          </div>
        </div>
      </div>
    </div>
  )
}
