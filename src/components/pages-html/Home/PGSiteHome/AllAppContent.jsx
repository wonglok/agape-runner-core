import { AppVersion } from '@/aws/AppVersion'
import { CSData } from '@/aws/CSData'
import { Modal } from 'antd'
import { useEffect } from 'react'
import { useSnapshot } from 'valtio'
import { ExtendWithVersion } from './ExtendWithVersion'
import { AppEntry } from '@/aws/AppEntry'

const confirm = Modal.confirm

export function AllAppContent({}) {
  let cs = useSnapshot(CSData)
  let { appEntryID } = cs

  //
  let appEntryOne = cs.appEntry.find((t) => {
    return t.oid === appEntryID
  })

  useEffect(() => {
    if (appEntryID) {
      AppVersion.invalidate({ appEntryID })
    }
  }, [appEntryID])

  return (
    <>
      {appEntryOne && (
        <div className='flex-none w-full max-w-full px-4 mt-6 mb-4 '>
          <div className='relative flex flex-col min-w-0 mx-2 break-words bg-white border shadow-inner border-slate-400 shadow-slate-200 shadow-soft-xl rounded-2xl bg-clip-border'>
            <div className='p-4 pb-4 mb-0 rounded-t-2xl'>
              <h6 className=' mb-3 text-2xl'>{`Let's Install an App`}</h6>
              <h6 className=' mb-3 text-lg'>/{appEntryOne.slug}</h6>

              <div className='flex flex-wrap mb-4'>
                <button
                  onClick={() => {
                    let entry = AppEntry.data.find((e) => e.oid === appEntryID)
                    entry.type = 'download-app'
                    AppEntry.update({ object: entry })
                  }}
                  className={
                    (appEntryOne.type === 'download-app'
                      ? 'bg-opacity-20'
                      : 'bg-opacity-100') +
                    ' transition-all duration-400  inline-block w-56 h-16 p-2 mb-3 mr-4 text-xs text-blue-900 bg-blue-400 border-2 border-blue-400 rounded-lg'
                  }
                >
                  <span className='text-lg font-bold'>Pick a metaOS App</span>
                  <br />
                  {`from AppStore & install here`}
                </button>
                <button
                  onClick={() => {
                    let entry = AppEntry.data.find((e) => e.oid === appEntryID)
                    entry.type = 'write-app'
                    AppEntry.update({ object: entry })
                  }}
                  className={
                    (appEntryOne.type === 'write-app'
                      ? 'bg-opacity-20'
                      : 'bg-opacity-100') +
                    ' transition-all duration-400  inline-block w-56 h-16 p-2 mb-3 mr-4 text-xs text-green-900 bg-green-400 border-2 border-green-400 rounded-lg'
                  }
                >
                  <span className='text-lg font-bold'> Develop 3D Apps</span>
                  <br />
                  with tools for this page
                </button>
                <button
                  onClick={() => {
                    let entry = AppEntry.data.find((e) => e.oid === appEntryID)
                    entry.type = 'make-3d'
                    AppEntry.update({ object: entry })
                  }}
                  className={
                    (appEntryOne.type === 'make-3d'
                      ? 'bg-opacity-20'
                      : 'bg-opacity-100') +
                    ' transition-all duration-400  inline-block w-56 h-16 p-2 mb-3 mr-4 text-xs text-teal-900 bg-teal-400 border-2 border-teal-400 rounded-lg'
                  }
                >
                  <span className='text-lg font-bold'>Design 3D ART / VFX</span>
                  <br />
                  {`  by ARTIST like you 🥰`}
                </button>
                <button
                  onClick={() => {
                    let entry = AppEntry.data.find((e) => e.oid === appEntryID)
                    entry.type = 'ab-testing'
                    AppEntry.update({ object: entry })
                  }}
                  className={
                    (appEntryOne.type === 'ab-testing'
                      ? 'bg-opacity-20'
                      : 'bg-opacity-100') +
                    ' transition-all duration-400  inline-block w-56 h-16 p-2 mb-3 mr-4 text-xs border-2 rounded-lg text-cyan-900 bg-cyan-400 border-cyan-400'
                  }
                >
                  <span className='text-lg font-bold'>Do A / B Testing</span>
                  <br />
                  for marketing purpose
                </button>
                <button
                  onClick={() => {
                    let entry = AppEntry.data.find((e) => e.oid === appEntryID)
                    entry.type = 'mind-map'
                    AppEntry.update({ object: entry })
                  }}
                  className={
                    (appEntryOne.type === 'mind-map'
                      ? 'bg-opacity-20'
                      : 'bg-opacity-100') +
                    ' transition-all duration-400  inline-block w-56 h-16 p-2 mb-3 mr-4 text-xs text-yellow-900 bg-yellow-400 border-2 border-yellow-400 rounded-lg'
                  }
                >
                  <span className='text-lg font-bold'>+ AutoSync MindMap</span>
                  <br />
                  for webhook enbaled promotions
                </button>
              </div>

              {/*  */}

              {appEntryOne.type === 'download-app' && (
                <>{'Todo: Add Placeholder for download app'}</>
              )}

              {appEntryOne.type === 'write-app' && (
                <>
                  <ExtendWithVersion></ExtendWithVersion>
                </>
              )}

              {appEntryOne.type === 'make-3d' && (
                <>{'Todo: Add Placeholder for make-3d'}</>
              )}

              {appEntryOne.type === 'ab-testing' && (
                <>{'Todo: Add Placeholder for ab-testing'}</>
              )}

              {appEntryOne.type === 'mindmap' && (
                <>{'Todo: Add Placeholder for mindmap'}</>
              )}

              {/*  */}
              {/*  */}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

//
