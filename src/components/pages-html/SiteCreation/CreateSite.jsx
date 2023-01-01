import { useRef } from 'react'
import { GuideNav } from './GuideNav'
import Link from 'next/link'
// import { GuideHeader } from './GuideHeader'

export function CreateSite() {
  let siteIDRef = useRef()
  return (
    <div>
      <GuideNav
        done={
          <div>
            <div className='px-5 py-1 mx-2 text-xl bg-gray-300 rounded-3xl'>
              Done
            </div>
          </div>
        }
      ></GuideNav>
      <div className='container  p-4 mx-auto ' style={{ minHeight: '50vh' }}>
        <Link href={'/agape'}>
          <h1 className=' flex items-center mb-3'>
            <img
              className='inline w-12 mr-1 opacity-75'
              src={'/img/back.svg'}
              alt='Back'
            ></img>
            Go Back to Dashboard
          </h1>
        </Link>
        {/*  */}
        <h1 className='text-2xl lg:text-3xl'>Give your metaverse a name!</h1>
        {/*  */}
        <div className='p-2 pl-0'>
          https://
          <input
            ref={siteIDRef}
            className='inline w-24 border-b border-gray-500 appearance-none'
            style={{ fontSize: '17px' }}
          ></input>
          .at.agape.town
        </div>
        <div className=''>Later on you can map your own domain as well...</div>
      </div>

      {/* <GuideHeader active={0} scrollLeft={0}></GuideHeader> */}
    </div>
  )
}
