import { useRef } from 'react'
import { Step } from './Step'
import { useEffect } from 'react'

export function GuideHeader({ scrollLeft = 0, active = 0 }) {
  let ref = useRef()

  useEffect(() => {
    if (window.innerWidth <= 500) {
      ref.current.scrollLeft = scrollLeft
    }
  }, [scrollLeft])

  return (
    <div>
      {/*  */}
      <div className='flex items-center justify-between bg-gray-100'>
        <div>
          <a
            className='block px-4 py-6 m-0 text-sm whitespace-nowrap text-slate-700'
            href='/agape'
          >
            <img
              src='../brand/agape.png'
              className='inline h-full max-w-full transition-all duration-200 ease-nav-brand max-h-8'
              alt='main_logo'
            />
          </a>
        </div>
        <div className='block py-6 m-0 text-sm px-7 whitespace-nowrap text-slate-700'>
          Let's Create Your Metaverse Site
        </div>
      </div>
      <div ref={ref} className='overflow-x-auto bg-gray-200'>
        <div className='pl-3' style={{ width: '800px' }}>
          <Step active={() => active === 0} text={`1. Create Site`}></Step>
          <Step active={() => active === 1} text={`2. Create Home Page`}></Step>
          <Step
            active={() => active === 2}
            text={`3. Map Domain / SubDomain`}
          ></Step>
        </div>
      </div>
      {/*  */}
      {/*  */}
    </div>
  )
}
