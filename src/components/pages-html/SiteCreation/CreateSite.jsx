import { useRef } from 'react'
import { GuideNav } from './GuideNav'
import Link from 'next/link'
import { checkSiteIDTaken, createSite } from './site-aws'
import { useState } from 'react'
import { useRouter } from 'next/router'
// import { GuideHeader } from './GuideHeader'

export function CreateSite() {
  let router = useRouter()
  let siteIDRef = useRef()
  let ctaRef = useRef()
  let tt = 0
  let [st, setSt] = useState({ msg: '', color: ' ' })
  return (
    <div>
      <GuideNav
        done={
          <div>
            <div
              ref={ctaRef}
              className='px-5 py-2 mx-2 text-base text-white bg-blue-700 shadow-lg cursor-pointer shadow-blue-500 rounded-3xl'
              onClick={async () => {
                let slug = siteIDRef.current.value
                if (!slug) {
                  setSt({ msg: '', color: '' })
                  return
                }

                if ((slug || '').length <= 4) {
                  setSt({ msg: 'name too short', color: 'text-red-500' })
                  return
                }

                createSite({ slug }).then(() => {
                  router.push('/agape')
                })
                //
                //
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
                if (!siteIDRef.current.value) {
                  setSt({ msg: '', color: '' })
                  return
                }

                if ((siteIDRef.current.value || '').length <= 4) {
                  setSt({ msg: 'name too short', color: 'text-red-500' })
                  return
                }

                let val = siteIDRef.current.value
                let isOkay = await checkSiteIDTaken({
                  slug: val,
                })

                if (isOkay) {
                  setSt({
                    msg: `"${val}" is avaiable`,
                    color: 'text-green-500',
                  })
                } else {
                  setSt({ msg: 'already taken', color: 'text-red-500' })
                }
              }, 100)
            }}
          ></input>
          .at.agape.town
        </div>

        {/*  */}
        {/*  */}
        <div className={`${st.color}`}>{st.msg}</div>
      </div>

      {/* <GuideHeader active={0} scrollLeft={0}></GuideHeader> */}
    </div>
  )
}

//
//
