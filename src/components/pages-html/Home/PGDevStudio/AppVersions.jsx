import { useSnapshot } from 'valtio'
import { ExtendWithVersion } from './ExtendWithVersion'
import { CSData } from '@/aws/CSData'

export function AllAppVersions() {
  let cs = useSnapshot(CSData)
  let app = cs.appGroup.find((e) => e.oid === cs.appGroupID)
  return (
    <>
      {cs.appGroupID && (
        <div className='flex-none w-full max-w-full px-4 mt-4 mb-6'>
          <div className='relative flex flex-col min-w-0 mx-2 break-words bg-white border shadow-inner border-slate-400 shadow-slate-200 shadow-soft-xl rounded-2xl bg-clip-border'>
            <div className='p-4 pb-0 mb-0 rounded-t-2xl'>
              <h6 className=' text-xl'>App:{` "${app?.slug}"`}</h6>

              {
                <ExtendWithVersion
                  appGroupID={cs.appGroupID}
                ></ExtendWithVersion>
              }
            </div>
          </div>
        </div>
      )}
    </>
  )
}
