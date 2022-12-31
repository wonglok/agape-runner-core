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

      <div ref={ref} className='overflow-x-auto bg-gray-200'>
        <div className='pl-3' style={{ width: '800px' }}>
          <Step active={() => active === 0} text={`1. Create Site`}></Step>
          <Step
            active={() => active === 2}
            text={`2. Map Domain / SubDomain`}
          ></Step>
        </div>
      </div>
      {/*  */}
      {/*  */}
    </div>
  )
}
