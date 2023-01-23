import { CSData } from '@/aws/CSData'
import { useSnapshot } from 'valtio'

export function AllAppVersions({}) {
  let { appEntryID, appEntry } = useSnapshot(CSData)

  let appEntryOne = appEntry.find((t) => {
    return t.oid === appEntryID
  })
  //
  return (
    <>
      {appEntryOne && (
        <div className='flex-none w-full max-w-full px-4 mt-6 mb-4 '>
          <div className='relative flex flex-col min-w-0 mx-2 break-words bg-white border shadow-inner border-slate-400 shadow-slate-200 shadow-soft-xl rounded-2xl bg-clip-border'>
            <div className='p-4 pb-4 mb-0 rounded-t-2xl'>
              <h6 className='mb-1 text-xl'>MetaOS App: {appEntryOne.title}</h6>
              <p className='mb-3 text-sm leading-normal'>
                The Metaverse by you.
              </p>

              <div>AppID: {'aa'}</div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

//
