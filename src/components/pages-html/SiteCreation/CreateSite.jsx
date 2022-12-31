import { useRef } from 'react'
import { GuideHeader } from './GuideHeader'
import { GuideNav } from './GuideNav'

export function CreateSite() {
  let siteIDRef = useRef()
  return (
    <div>
      <GuideNav></GuideNav>
      <div className='container  p-4 mx-auto ' style={{ minHeight: '50vh' }}>
        <h1 className=' flex items-center mb-3'>
          <img
            className='inline w-12 mr-1 opacity-75'
            src={'/img/back.svg'}
            alt='Back'
          ></img>
          Go Back to Dashboard
        </h1>
        {/*  */}
        <h1 className='text-2xl'>Name Your metaverse!</h1>
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
      </div>

      {/* <GuideHeader active={0} scrollLeft={0}></GuideHeader> */}
    </div>
  )
}
