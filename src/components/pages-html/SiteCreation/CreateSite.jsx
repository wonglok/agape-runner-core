import { Step } from './Step'

export function CreateSite() {
  return (
    <div>
      {/*  */}
      <div className='bg-gray-100'>
        <a
          className='block px-8 py-6 m-0 text-sm whitespace-nowrap text-slate-700'
          href='../agape'
          target='_blank'
        >
          <img
            src='../brand/agape.png'
            className='inline h-full max-w-full transition-all duration-200 ease-nav-brand max-h-8'
            alt='main_logo'
          />
        </a>
      </div>
      <div className=' flex items-center justify-center'>
        <div>
          <Step active={() => true} text={`1. Create Site Name`}></Step>
          <Step active={() => false} text={`2. Map Domain`}></Step>
        </div>
      </div>
      {/*  */}
      {/*  */}
    </div>
  )
}
