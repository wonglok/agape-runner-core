import { useRef } from 'react'
import { GuideNav } from './GuideNav'
import Link from 'next/link'
import { checkSiteIDTaken } from './site-aws'
// import { GuideHeader } from './GuideHeader'

export function CreateSite() {
  let siteIDRef = useRef()
  let ctaRef = useRef()
  let tt = 0
  return (
    <div>
      <GuideNav
        done={
          <div>
            <div
              ref={ctaRef}
              className='px-5 py-2 mx-2 text-base text-white bg-blue-700 shadow-lg cursor-pointer shadow-blue-500 rounded-3xl'
              onClick={async () => {
                if (!siteIDRef.current.value) {
                  return
                }
                //
                let isOkay = await checkSiteIDTaken({
                  slug: siteIDRef.current.value,
                }).catch((e) => {
                  return false
                })

                if (isOkay === true) {
                  //!SECTION

                  console.log(123)
                }
              }}
            >
              Create
            </div>
          </div>
        }
      ></GuideNav>
      <div className='container  p-4 mx-auto ' style={{ minHeight: '50vh' }}>
        <Link href={'/agape'}>
          <h1 className=' flex items-center mb-8 lg:mb-3'>
            <img
              className='inline w-12 mr-1 opacity-75'
              src={'/img/back.svg'}
              alt='Back'
            ></img>
            {`Go Back to Dashboard`}
          </h1>
        </Link>

        {/*  */}
        {/*  */}
        <h1 className='text-2xl lg:text-3xl'>Give your metaverse a name!</h1>
        {/*  */}
        <div className='p-2 pl-0'>
          https://
          <input
            ref={siteIDRef}
            className='inline w-24 px-2 border-b border-gray-500 appearance-none'
            style={{ fontSize: '17px' }}
            onInput={() => {
              //
              //

              clearTimeout(tt)
              tt = setTimeout(async () => {
                let isOkay = await checkSiteIDTaken({
                  slug: siteIDRef.current.value,
                })

                console.log(isOkay)
              }, 100)
            }}
          ></input>
          .at.agape.town
        </div>

        {/*  */}
        {/*  */}
        <div className=''></div>
      </div>

      {/* <GuideHeader active={0} scrollLeft={0}></GuideHeader> */}
    </div>
  )
}

//
