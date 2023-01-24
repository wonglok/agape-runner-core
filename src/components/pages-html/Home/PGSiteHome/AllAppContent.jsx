import { AppVersion } from '@/aws/AppVersion'
import { CSData } from '@/aws/CSData'
import { Modal } from 'antd'
import { useEffect } from 'react'
import { useSnapshot } from 'valtio'
import { ExtendWithVersion } from './ExtendWithVersion'

const confirm = Modal.confirm

export function AllAppContent({}) {
  let cs = useSnapshot(CSData)
  let { appEntryID } = cs

  //
  let appEntryOne = CSData.appEntry.find((t) => {
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
              <h6 className=' mb-3 text-xl'>Page: /{appEntryOne.slug}</h6>

              <div className='flex flex-wrap mb-4'>
                <button className='inline-block w-56 h-16 p-2 mb-3 mr-4 text-xs text-white bg-blue-700 border-2 border-blue-500 rounded-lg'>
                  <span className='text-lg font-bold'> Download 3D App</span>
                  <br />
                  {`to "/{appEntryOne.slug}" Page`}
                </button>
                <button className='inline-block w-56 h-16 p-2 mb-3 mr-4 text-xs text-white bg-green-700 border-2 border-green-500 rounded-lg'>
                  <span className='text-lg font-bold'> Develop 3D App</span>
                  <br />
                  for this page
                </button>
                <button className='inline-block w-56 h-16 p-2 mb-3 mr-4 text-xs text-white bg-teal-700 border-2 border-teal-500 rounded-lg'>
                  <span className='text-lg font-bold'>Design 3D ART / VFX</span>
                  <br />
                  {`  by ARTIST like you 🥰`}
                </button>
                <button className='inline-block w-56 h-16 p-2 mb-3 mr-4 text-xs text-white border-2 rounded-lg bg-cyan-700 border-cyan-500'>
                  <span className='text-lg font-bold'>Do A / B Testing</span>
                  <br />
                  for marketing purpose
                </button>
                <button className='inline-block w-56 h-16 p-2 mb-3 mr-4 text-xs text-white bg-yellow-700 border-2 border-yellow-500 rounded-lg'>
                  <span className='text-lg font-bold'>Add a MindMap</span>
                  <br />
                  for webhook enbaled promotions
                </button>
              </div>

              {/*  */}

              {appEntryOne.type === 'write-code' && (
                <>
                  <ExtendWithVersion></ExtendWithVersion>
                </>
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
