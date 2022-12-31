import { useRef } from 'react'
import { GuideHeader } from './GuideHeader'
import { GuideNav } from './GuideNav'

export function CreateSite() {
  let siteIDRef = useRef()
  return (
    <div>
      <GuideNav></GuideNav>
      <div className='p-4'>
        <h1 className='text-2xl'>Give your metaverse a name!</h1>
        <div className='p-2 pl-0'>
          https://
          <input
            ref={siteIDRef}
            className='inline w-24 border-b border-gray-500 appearance-none'
          ></input>
          .at.agape.town
        </div>
      </div>

      {/* <GuideHeader active={0} scrollLeft={0}></GuideHeader> */}
    </div>
  )
}
