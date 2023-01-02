import Link from 'next/link'
import { useEffect } from 'react'
import { useState } from 'react'
import { siteRecent } from '../aws/site-aws'
import { OneCard } from '../Compos/OneCard'

/* eslint-disable @next/next/no-img-element */
export function MyRecentSites() {
  let [recentSites, setSites] = useState([])

  useEffect(() => {
    siteRecent({}).then(
      (data) => {
        let cleand = [data.list[0], data.list[1], data.list[2]].filter((e) => e)
        setSites(cleand)
        // console.log(data)
      },
      (err) => {
        console.error(err)
      }
    )
  }, [])
  return (
    <div className='flex-none w-full max-w-full px-4 mt-9'>
      <div className='relative flex flex-col min-w-0 mx-2 mb-6 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border'>
        <div className='p-4 pb-0 mb-0 bg-white rounded-t-2xl'>
          <h6 className='mb-1 text-xl'>Your Recent Sites</h6>
          <p className='mb-3 text-sm leading-normal'>The Metaverse by you. </p>
        </div>
        {/*  */}
        {/*  */}
        <div className='flex-auto mx-2'>
          <div className='flex flex-wrap mb-8'>
            <div className='w-full max-w-full px-3 mb-6 cursor-pointer md:w-6/12 md:flex-none xl:mb-0 xl:w-3/12'>
              <Link
                href={'/creator-portal/create-site'}
                data-stuff='javascript:;'
              >
                <div className='relative flex flex-col h-full min-w-0 break-words bg-transparent border border-solid shadow-inner rounded-2xl border-slate-100 bg-clip-border'>
                  <div className='flex flex-col justify-center flex-auto p-6 text-center '>
                    <span>
                      <i className='mb-4 fa fa-plus text-slate-400' />
                      <h5 className='text-slate-400'>New Site</h5>
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {recentSites.map((site) => {
              return <OneCard key={site.oid} site={site}></OneCard>
            })}

            {/*  */}

            {/* <div className='w-full max-w-full px-3 mb-6 md:w-6/12 md:flex-none xl:mb-0 xl:w-3/12'>
              <div className='relative flex flex-col min-w-0 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border'>
                <div className='relative'>
                  <a className='block shadow-xl rounded-2xl'>
                    <img
                      src='../assets/img/home-decor-1.jpg'
                      alt='img-blur-shadow'
                      className='max-w-full shadow-soft-2xl rounded-2xl'
                    />
                  </a>
                </div>
                <div className='flex-auto px-1 pt-6'>
                  <p className='relative z-10 mb-2 text-sm leading-normal text-transparent bg-gradient-to-tl from-gray-900 to-slate-800 bg-clip-text'>
                    Avatar #2
                  </p>
                  <a data-stuff='javascript:;'>
                    <h5>Modern</h5>
                  </a>
                  <p className='mb-6 text-sm leading-normal'>
                    As Uber works through a huge amount of internal management
                    turmoil.
                  </p>
                  <div className='flex items-center justify-between'>
                    <button
                      type='button'
                      className='inline-block px-8 py-2 mb-0 text-xs font-bold text-center uppercase align-middle bg-transparent border border-solid rounded-lg shadow-none cursor-pointer transition-all leading-pro ease-soft-in hover:scale-102 active:shadow-soft-xs tracking-tight-soft border-fuchsia-500 text-fuchsia-500 hover:border-fuchsia-500 hover:bg-transparent hover:text-fuchsia-500 hover:opacity-75 hover:shadow-none active:bg-fuchsia-500 active:text-white active:hover:bg-transparent active:hover:text-fuchsia-500'
                    >
                      View Project
                    </button>
                    <div className='mt-2'>
                      <a
                        data-stuff='javascript:;'
                        className='relative z-20 inline-flex items-center justify-center w-6 h-6 text-xs text-white border-2 border-white border-solid transition-all duration-200 ease-soft-in-out rounded-circle hover:z-30'
                        data-target='tooltip_trigger'
                        data-placement='bottom'
                      >
                        <img
                          className='w-full rounded-circle'
                          alt='Image placeholder'
                          src='../assets/img/team-1.jpg'
                        />
                      </a>
                      <div
                        data-target='tooltip'
                        className='hidden px-2 py-1 text-sm text-white bg-black rounded-lg'
                        role='tooltip'
                      >
                        Elena Morison
                        <div
                          className="absolute invisible w-2 h-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"
                          data-popper-arrow
                        />
                      </div>
                      <a
                        data-stuff='javascript:;'
                        className='relative z-20 inline-flex items-center justify-center w-6 h-6 -ml-4 text-xs text-white border-2 border-white border-solid transition-all duration-200 ease-soft-in-out rounded-circle hover:z-30'
                        data-target='tooltip_trigger'
                        data-placement='bottom'
                      >
                        <img
                          className='w-full rounded-circle'
                          alt='Image placeholder'
                          src='../assets/img/team-2.jpg'
                        />
                      </a>
                      <div
                        data-target='tooltip'
                        className='hidden px-2 py-1 text-sm text-white bg-black rounded-lg'
                        role='tooltip'
                      >
                        Ryan Milly
                        <div
                          className="absolute invisible w-2 h-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"
                          data-popper-arrow
                        />
                      </div>
                      <a
                        data-stuff='javascript:;'
                        className='relative z-20 inline-flex items-center justify-center w-6 h-6 -ml-4 text-xs text-white border-2 border-white border-solid transition-all duration-200 ease-soft-in-out rounded-circle hover:z-30'
                        data-target='tooltip_trigger'
                        data-placement='bottom'
                      >
                        <img
                          className='w-full rounded-circle'
                          alt='Image placeholder'
                          src='../assets/img/team-3.jpg'
                        />
                      </a>
                      <div
                        data-target='tooltip'
                        className='hidden px-2 py-1 text-sm text-white bg-black rounded-lg'
                        role='tooltip'
                      >
                        Nick Daniel
                        <div
                          className="absolute invisible w-2 h-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"
                          data-popper-arrow
                        />
                      </div>
                      <a
                        data-stuff='javascript:;'
                        className='relative z-20 inline-flex items-center justify-center w-6 h-6 -ml-4 text-xs text-white border-2 border-white border-solid transition-all duration-200 ease-soft-in-out rounded-circle hover:z-30'
                        data-target='tooltip_trigger'
                        data-placement='bottom'
                      >
                        <img
                          className='w-full rounded-circle'
                          alt='Image placeholder'
                          src='../assets/img/team-4.jpg'
                        />
                      </a>
                      <div
                        data-target='tooltip'
                        className='hidden px-2 py-1 text-sm text-white bg-black rounded-lg'
                        role='tooltip'
                      >
                        Peterson
                        <div
                          className="absolute invisible w-2 h-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"
                          data-popper-arrow
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='w-full max-w-full px-3 mb-6 md:w-6/12 md:flex-none xl:mb-0 xl:w-3/12'>
              <div className='relative flex flex-col min-w-0 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border'>
                <div className='relative'>
                  <a className='block shadow-xl rounded-2xl'>
                    <img
                      src='../assets/img/home-decor-2.jpg'
                      alt='img-blur-shadow'
                      className='max-w-full shadow-soft-2xl rounded-xl'
                    />
                  </a>
                </div>
                <div className='flex-auto px-1 pt-6'>
                  <p className='relative z-10 mb-2 text-sm leading-normal text-transparent bg-gradient-to-tl from-gray-900 to-slate-800 bg-clip-text'>
                    Project #1
                  </p>
                  <a data-stuff='javascript:;'>
                    <h5>Scandinavian</h5>
                  </a>
                  <p className='mb-6 text-sm leading-normal'>
                    Music is something that every person has his or her own
                    specific opinion about.
                  </p>
                  <div className='flex items-center justify-between'>
                    <button
                      type='button'
                      className='inline-block px-8 py-2 mb-0 text-xs font-bold text-center uppercase align-middle bg-transparent border border-solid rounded-lg shadow-none cursor-pointer transition-all leading-pro ease-soft-in hover:scale-102 active:shadow-soft-xs tracking-tight-soft border-fuchsia-500 text-fuchsia-500 hover:border-fuchsia-500 hover:bg-transparent hover:text-fuchsia-500 hover:opacity-75 hover:shadow-none active:bg-fuchsia-500 active:text-white active:hover:bg-transparent active:hover:text-fuchsia-500'
                    >
                      View Project
                    </button>
                    <div className='mt-2'>
                      <a
                        data-stuff='javascript:;'
                        className='relative z-20 inline-flex items-center justify-center w-6 h-6 text-xs text-white border-2 border-white border-solid transition-all duration-200 ease-soft-in-out rounded-circle hover:z-30'
                        data-target='tooltip_trigger'
                        data-placement='bottom'
                      >
                        <img
                          className='w-full rounded-circle'
                          alt='Image placeholder'
                          src='../assets/img/team-3.jpg'
                        />
                      </a>
                      <div
                        data-target='tooltip'
                        className='hidden px-2 py-1 text-sm text-white bg-black rounded-lg'
                        role='tooltip'
                      >
                        Nick Daniel
                        <div
                          className="absolute invisible w-2 h-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"
                          data-popper-arrow
                        />
                      </div>
                      <a
                        data-stuff='javascript:;'
                        className='relative z-20 inline-flex items-center justify-center w-6 h-6 -ml-4 text-xs text-white border-2 border-white border-solid transition-all duration-200 ease-soft-in-out rounded-circle hover:z-30'
                        data-target='tooltip_trigger'
                        data-placement='bottom'
                      >
                        <img
                          className='w-full rounded-circle'
                          alt='Image placeholder'
                          src='../assets/img/team-4.jpg'
                        />
                      </a>
                      <div
                        data-target='tooltip'
                        className='hidden px-2 py-1 text-sm text-white bg-black rounded-lg'
                        role='tooltip'
                      >
                        Peterson
                        <div
                          className="absolute invisible w-2 h-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"
                          data-popper-arrow
                        />
                      </div>
                      <a
                        data-stuff='javascript:;'
                        className='relative z-20 inline-flex items-center justify-center w-6 h-6 -ml-4 text-xs text-white border-2 border-white border-solid transition-all duration-200 ease-soft-in-out rounded-circle hover:z-30'
                        data-target='tooltip_trigger'
                        data-placement='bottom'
                      >
                        <img
                          className='w-full rounded-circle'
                          alt='Image placeholder'
                          src='../assets/img/team-1.jpg'
                        />
                      </a>
                      <div
                        data-target='tooltip'
                        className='hidden px-2 py-1 text-sm text-white bg-black rounded-lg'
                        role='tooltip'
                      >
                        Elena Morison
                        <div
                          className="absolute invisible w-2 h-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"
                          data-popper-arrow
                        />
                      </div>
                      <a
                        data-stuff='javascript:;'
                        className='relative z-20 inline-flex items-center justify-center w-6 h-6 -ml-4 text-xs text-white border-2 border-white border-solid transition-all duration-200 ease-soft-in-out rounded-circle hover:z-30'
                        data-target='tooltip_trigger'
                        data-placement='bottom'
                      >
                        <img
                          className='w-full rounded-circle'
                          alt='Image placeholder'
                          src='../assets/img/team-2.jpg'
                        />
                      </a>
                      <div
                        data-target='tooltip'
                        className='hidden px-2 py-1 text-sm text-white bg-black rounded-lg'
                        role='tooltip'
                      >
                        Ryan Milly
                        <div
                          className="absolute invisible w-2 h-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"
                          data-popper-arrow
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
