import { useSnapshot } from 'valtio'
import Link from 'next/link'
import { CSData } from '@/aws/CSData'
import { useEffect } from 'react'
import { AppEntry } from '@/aws/AppEntry'
import { Tag } from 'antd'

export function AllAppEntry() {
  let cs = useSnapshot(CSData)

  useEffect(() => {
    AppEntry.invalidate()
  }, [])

  return (
    <div className='flex-none w-full max-w-full px-4 mt-4 mb-6'>
      <div className='relative flex flex-col min-w-0 mx-2 break-words bg-white border shadow-inner border-slate-400 shadow-slate-200 shadow-soft-xl rounded-2xl bg-clip-border'>
        <div className='p-4 pb-0 mb-0 rounded-t-2xl'>
          <h6 className='mb-1 text-xl'>My Apps</h6>

          {cs.appEntry.map((it, idx) => {
            return (
              <div key={it.oid} className='py-3'>
                <p className='mb-3 text-sm leading-normal'>
                  <button className='p-2 px-4 mr-2 bg-gray-100 rounded-xl'>
                    {it.title}
                  </button>

                  <Link prefetch={idx === 0} href={`/apps/${it.oid}`}>
                    <button className='p-2 px-4 mr-2 text-white bg-blue-500 rounded-xl'>
                      Edit
                    </button>
                  </Link>
                </p>

                {it.tags.map((t) => {
                  return <Tag key={t.oid}>{t.name}</Tag>
                })}
              </div>
            )
          })}

          {/*  */}

          {cs.appEntry.length === 0 && (
            <>
              <p className='mb-3 text-sm leading-normal'>
                Please create an item.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
