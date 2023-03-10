import { signOut } from '@/auth/GateMethods'
import { getID } from '@/lib/getID'
import { useSnapshot } from 'valtio'
import { GUIState } from './GUIState'
import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { OneLink } from './OneLink'
// import { SitePagesLink } from './SitePagesLink'
// import { MetaverseFolders } from './MetaverseFolders'
// import { GateState } from '@/auth/GateState.ts'
// import { useSnapshot } from 'valtio'

export function LeftMenu({}) {
  // let gs = useSnapshot(GateState)

  // let {
  //   query: { folderID },
  // } = useRouter()

  let gui = useSnapshot(GUIState)

  useEffect(() => {
    let h = () => {
      if (window.innerWidth <= 500) {
        GUIState.menuOpen = true
      } else {
        GUIState.menuOpen = false
      }
    }

    h()

    window.addEventListener('resize', h)
    return () => {
      window.removeEventListener('resize', h)
    }
  }, [])

  return (
    <>
      <aside
        className={`fixed  shadow-2xl shadow-slate-400 inset-y-0 flex-wrap items-center justify-between block w-full p-0  my-4 ml-4 overflow-x-auto overflow-y-auto antialiased bg-white border-0 max-w-62.5 ease-nav-brand z-990  rounded-2xl transition-transform duration-200 xl:left-0 xl:bg-transparent ${
          gui.menuOpen ? `  ` : ` `
        }`}
        style={{
          transform: `${gui.menuOpen ? `translateX(-100vw)` : ``}`,
        }}
      >
        <div className='h-19.5'>
          <i className='absolute top-0 right-0 hidden p-4 opacity-50 cursor-pointer fas fa-times text-slate-400 xl:hidden' />
          <a
            className='flex justify-center px-8 py-6 m-0 text-sm whitespace-nowrap text-slate-700'
            href='/admin'
            target='_blank'
          >
            <img
              src='/brand/agape.png'
              className='inline h-full max-w-full transition-all duration-200 ease-nav-brand max-h-8'
              alt='main_logo'
            />
          </a>
        </div>

        <hr className=' h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent' />

        <div className=''>
          <ul className='flex flex-col pl-0 mb-0'>
            <li className='w-full mt-4'>
              <h6 className='pl-6 ml-2 text-xs font-bold leading-tight uppercase opacity-60'>
                Home
              </h6>
            </li>
            {/*  */}
            {/*  */}
            {/*  */}
            {/*  */}
            {/*  */}
            {/*  */}
            {/*  */}
            {[
              // { oid: getID(), link: `/admin`, name: 'All My Sites' },
              {
                oid: getID(),
                link: `/admin`,
                name: 'Dashboard',
              },
              // {
              //   oid: getID(),
              //   link: `/admin/meta-os/app-store`,
              //   name: 'App Store',
              // },
              // {
              //   oid: getID(),
              //   link: `/admin/meta-os/site-seo`,
              //   name: 'Site SEO',
              // },
            ].map((item) => {
              return <OneLink key={item.oid} item={item}></OneLink>
            })}

            {/*  */}
            {/*  */}
            {/*  */}
            <li className='w-full mt-4'>
              <h6 className='pl-6 ml-2 text-xs font-bold leading-tight uppercase opacity-60'>
                3D WebApp
              </h6>
            </li>
            {[
              {
                oid: getID(),
                link: `/admin/dev/studio`,
                name: '3D WebApp Studio',
              },
            ].map((item) => {
              return <OneLink key={item.oid} item={item}></OneLink>
            })}

            {/*  */}
            {/*  */}
            {/*  */}
            <li className='w-full mt-4'>
              <h6 className='pl-6 ml-2 text-xs font-bold leading-tight uppercase opacity-60'>
                WebNative 3D & VFX
              </h6>
            </li>
            {[
              {
                oid: getID(),
                link: `/admin/art/studio`,
                name: '3D Creation Studio',
              },
            ].map((item) => {
              return <OneLink key={item.oid} item={item}></OneLink>
            })}

            {/* AGAPE */}
            {/* Global Sync of Social Graph */}
            {/* Distributed Content Storage */}
            {/* Personal Ownership of your own data */}
            {/*  */}
            {/*
            <li className='w-full mt-4'>
              <h6 className='pl-6 ml-2 text-xs font-bold leading-tight uppercase opacity-60'>
                Novalink Synced Ads
              </h6>
            </li>

            {[
              //
              {
                oid: getID(),
                link: `/admin/nova-link/buddy-list`,
                name: 'Buddy List',
              },
              //
              {
                oid: getID(),
                link: `/admin/nova-link/product-sync`,
                name: 'Product Sync',
              },
              //
              {
                oid: getID(),
                link: `/admin/nova-link/monetisation`,
                name: 'Monetisation',
              },
            ].map((item) => {
              return <OneLink key={item.oid} item={item}></OneLink>
            })} */}
            {/*
            {siteID && (
              <>
                <SitePagesLink siteID={siteID}></SitePagesLink>
              </>
            )}
            */}
            {
              // <>
              //   <MetaverseFolders></MetaverseFolders>
              // </>
            }
            {/*  */}
            <li className='w-full mt-4'>
              <h6 className='pl-6 ml-2 text-xs font-bold leading-tight uppercase opacity-60'>
                Security
              </h6>
            </li>
            <li className='w-full mt-0.5'>
              <span
                onClick={() => {
                  signOut()
                }}
                className='flex items-center px-4 mx-4 my-0 text-sm cursor-pointer py-2.7 ease-nav-brand whitespace-nowrap transition-colors'
              >
                <svg
                  width='24'
                  height='24'
                  xmlns='http://www.w3.org/2000/svg'
                  fillRule='evenodd'
                  clipRule='evenodd'
                  className='rounded-full shadow-lg fill-slate-800'
                >
                  <path d='M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm-3 5.753l6.44 5.247-6.44 5.263.678.737 7.322-6-7.335-6-.665.753z' />
                </svg>
                <span
                  className={
                    'ml-1 opacity-100 pointer-events-none duration-300 ease-soft '
                  }
                >
                  Logout
                </span>
              </span>
            </li>
          </ul>
        </div>
      </aside>
    </>
  )
}
