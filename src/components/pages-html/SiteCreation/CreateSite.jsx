import { useRef } from 'react'
import { GuideNav } from './GuideNav'
import Link from 'next/link'
// import { GuideHeader } from './GuideHeader'

export function CreateSite() {
  let siteIDRef = useRef()
  return (
    <div>
      <GuideNav></GuideNav>
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
        <h1 className='text-2xl'>Give your metaverse a name!</h1>
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
