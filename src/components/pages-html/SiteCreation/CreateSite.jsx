import { GuideHeader } from './GuideHeader'
import { GuideNav } from './GuideNav'

export function CreateSite() {
  return (
    <div>
      <GuideNav></GuideNav>
      <div className='p-4'>
        <h1 className='text-xl'>Give your site a name!</h1>
        <div className=''>
          https://
          <input className='inline border-b border-gray-500 appearance-none  w-36'></input>
          .at.agape.town
        </div>
      </div>
      {/* <GuideHeader active={0} scrollLeft={0}></GuideHeader> */}
    </div>
  )
}
