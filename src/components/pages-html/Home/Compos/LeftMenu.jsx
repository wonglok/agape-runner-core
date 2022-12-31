import { signOut } from '@/auth/GateMethods'
import { getID } from '@/lib/getID'
import Link from 'next/link'
// import { GateState } from '@/auth/GateState.ts'
// import { useSnapshot } from 'valtio'

export function LeftMenu() {
  // let gs = useSnapshot(GateState)
  let getClass = (className, url) => {
    if (location) {
      return location.pathname === url ? className : ''
    }
  }

  return (
    <aside className='fixed inset-y-0 flex-wrap items-center justify-between block w-full p-0 my-4 ml-4 overflow-y-auto antialiased bg-white border-0 shadow-none max-w-62.5 ease-nav-brand z-990 -translate-x-full rounded-2xl transition-transform duration-200 xl:left-0 xl:translate-x-0 xl:bg-transparent'>
      <div className='h-19.5'>
        <i className='absolute top-0 right-0 hidden p-4 opacity-50 cursor-pointer fas fa-times text-slate-400 xl:hidden' />
        <a
          className='block px-8 py-6 m-0 text-sm whitespace-nowrap text-slate-700'
          href='../agape'
          target='_blank'
        >
          <img
            src='../brand/agape.png'
            className='inline h-full max-w-full transition-all duration-200 ease-nav-brand max-h-8'
            alt='main_logo'
          />
        </a>
      </div>

      <hr className='h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent' />

      <div className='items-center block w-auto max-h-screen overflow-auto h-sidenav grow basis-full'>
        <ul className='flex flex-col pl-0 mb-0'>
          <li className='w-full mt-4'>
            <h6 className='pl-6 ml-2 text-xs font-bold leading-tight uppercase opacity-60'>
              Dashboard Pages
            </h6>
          </li>
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {[
            //
            { _id: getID(), link: '/agape', name: 'Dashboard' },
            // { _id: getID(), link: '/agape/pldaces', name: 'Domain' },
            { _id: getID(), link: '/agape/sites', name: 'My Sites' },
          ].map((item) => {
            //
            return (
              <li key={item._id} className='w-full mt-0.5'>
                <Link href={item.link}>
                  <div className='flex items-center px-4 mx-4 my-0 text-sm cursor-pointer hover:underline underline-offset-4 py-2.7 ease-nav-brand whitespace-nowrap transition-colors'>
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
                        'ml-1 opacity-100 pointer-events-none duration-300 ease-soft ' +
                        getClass('text-slate-700 underline ', item.link)
                      }
                    >
                      {item.name}
                    </span>
                  </div>
                </Link>
              </li>
            )
          })}
          {/*  */}
          {/*  */}

          <li className='w-full mt-4'>
            <h6 className='pl-6 ml-2 text-xs font-bold leading-tight uppercase opacity-60'>
              More
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
  )
}
