import { DomainMappingAll } from '../Domains/Domain'

export function DomainMapping() {
  return (
    <div className='flex-none w-full max-w-full px-4 mb-4 '>
      <div className='relative flex flex-col min-w-0 mx-2 break-words bg-white border shadow-inner border-slate-400 shadow-slate-200 shadow-soft-xl rounded-2xl bg-clip-border'>
        <div className='p-4 pb-0 mb-0 rounded-t-2xl'>
          <h6 className='mb-1 text-xl'>Domain Mapping</h6>
          <p className='mb-3 text-sm leading-normal'>
            Point your Metaverse to your domain.
          </p>
        </div>
        <div>
          <DomainMappingAll></DomainMappingAll>
        </div>
        <div>
          {/*  */}
          {/*  */}
        </div>
      </div>
    </div>
  )
}
