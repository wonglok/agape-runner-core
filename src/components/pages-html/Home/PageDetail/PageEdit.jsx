import { useSnapshot } from 'valtio'
import { SiteStateData } from '../aws/SiteState'

export function PageEdit() {
  let siteData = useSnapshot(SiteStateData)

  return (
    <div className='flex-none w-full max-w-full px-4 mb-4 '>
      <div className='relative flex flex-col min-w-0 mx-2 break-words bg-white border shadow-inner border-slate-400 shadow-slate-200 shadow-soft-xl rounded-2xl bg-clip-border'>
        <div className='p-4 pb-0 mb-0 rounded-t-2xl'>
          <h6 className='mb-1 text-xl'>Page Detail</h6>
          <p className='mb-3 text-sm leading-normal'>The Metaverse by you. </p>

          <div>{JSON.stringify(siteData.page)}</div>
        </div>
      </div>
    </div>
  )
}
