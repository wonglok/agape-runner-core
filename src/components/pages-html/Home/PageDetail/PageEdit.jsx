import { useSnapshot } from 'valtio'
import { SiteStateData } from '../aws/SiteState'
import { updatePage } from '../aws/page-aws'
export function PageEdit() {
  let siteData = useSnapshot(SiteStateData)

  return (
    <div className='flex-none w-full max-w-full px-4 mb-4 '>
      <div className='relative flex flex-col min-w-0 mx-2 break-words bg-white border shadow-inner border-slate-400 shadow-slate-200 shadow-soft-xl rounded-2xl bg-clip-border'>
        <div className='p-4 pb-0 mb-0 rounded-t-2xl'>
          <h6 className='mb-1 text-xl'>Page Detail</h6>
          <p className='mb-3 text-sm leading-normal'>The Metaverse by you. </p>

          <div></div>
          <pre>{JSON.stringify(siteData.page, null, '  ')}</pre>
          <div></div>

          {/*  */}
          <div>
            <TextEntries name={'colliderURL'}></TextEntries>
          </div>
          <div>
            <TextEntries name={'mapURL'}></TextEntries>
          </div>
        </div>
      </div>
    </div>
  )
}

function TextEntries({ name = 'colliderURL' }) {
  let siteData = useSnapshot(SiteStateData)
  let pageRoot = siteData.page || {}
  return (
    <>
      <input
        className='p-2 my-2 border border-r-0 appearance-none w-52 rounded-l-xl'
        type={'text'}
        defaultValue={pageRoot[name] || ''}
        onInput={(ev) => {
          SiteStateData.page = SiteStateData.page || {}
          SiteStateData.page[name] = ev.target.value
        }}
      ></input>
      <button
        onClick={async (ev) => {
          //
          ev.target.innerText = 'Loading'
          await updatePage({ object: pageRoot })
          ev.target.innerText = 'Save'
        }}
        className='w-24 px-3 py-2 border rounded-r-xl'
      >
        Save
      </button>
    </>
  )
}
