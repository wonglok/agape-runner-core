import { AppVersion } from '@/aws/AppVersion'
import { CSData } from '@/aws/CSData'
import { getID } from '@/lib/getID'
import { useEffect } from 'react'
import { useSnapshot } from 'valtio'

export function AllAppVersions({}) {
  let cs = useSnapshot(CSData)
  let { appEntryID, appEntry } = cs
  let appEntryOne = appEntry.find((t) => {
    return t.oid === appEntryID
  })

  useEffect(() => {
    if (appEntryID) {
      AppVersion.invalidate({ appEntryID })
    }
  }, [appEntryID])
  //
  return (
    <>
      {appEntryOne && (
        <div className='flex-none w-full max-w-full px-4 mt-6 mb-4 '>
          <div className='relative flex flex-col min-w-0 mx-2 break-words bg-white border shadow-inner border-slate-400 shadow-slate-200 shadow-soft-xl rounded-2xl bg-clip-border'>
            <div className='p-4 pb-4 mb-0 rounded-t-2xl'>
              <h6 className='mb-1 text-xl'>MetaOS App: {appEntryOne.title}</h6>
              <p className='mb-3 text-sm leading-normal'>
                Versions of this App...
                <button
                  className=' ml-3 underline'
                  onClick={() => {
                    //
                    AppVersion.create({
                      title: 'new version',
                      slug: 'happy123' + getID(),
                      appEntryID: appEntryOne.oid,
                    }).then((response) => {
                      //
                      console.log(response)
                      AppVersion.invalidate({ appEntryID: appEntryOne.oid })
                    })
                  }}
                >
                  Create a new Version
                </button>
              </p>
              <pre className=' whitespace-pre-wrap'>
                {JSON.stringify(cs.appVersions, null, '  ')}
              </pre>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

//
