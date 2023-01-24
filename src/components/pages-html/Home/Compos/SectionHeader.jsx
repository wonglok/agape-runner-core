import { signOut } from '@/auth/GateMethods'
import { GateState } from '@/auth/GateState.ts'
import { useSnapshot } from 'valtio'
import { GUIState } from './GUIState'

export function SectionHeader({
  root = ``,
  subRoot = ``,
  title = 'Dashboard',
  subTitle = `Metaverse Overview`,
  bgImage = '../assets/img/curved-images/curved0.jpg',
  bgOffsetY = '50',
  bar = null,
}) {
  return (
    <>
      <div className='relative'>
        <nav
          className='absolute z-20 flex flex-wrap items-center justify-between w-full px-6 py-2 text-white shadow-none  ease-soft-in lg:flex-nowrap lg:justify-start'
          navbar-scroll='true'
        >
          <div className=' flex items-center justify-between w-full px-3 py-1 mx-auto flex-wrap-inherit'>
            <nav>
              {/* breadcrumb */}
              <ol className='flex flex-wrap pt-1 pl-2 pr-4 mr-12 bg-transparent rounded-lg sm:mr-16'>
                <li className='text-sm leading-normal ' aria-current='page'>
                  {`${root}`}
                </li>
                {subRoot && (
                  <li
                    className="pl-2 text-sm leading-normal  before:float-left before:pr-2 before:content-['/']"
                    aria-current='page'
                  >
                    {subRoot}
                  </li>
                )}
              </ol>
              <h6 className='mb-2 ml-2 text-3xl font-bold text-white '>
                {title}
              </h6>
              <h4 className='mb-2 ml-2 -mt-2 text-xl font-normal text-gray-100 '>
                {subTitle}
              </h4>
            </nav>
            <div className='flex items-center justify-between mt-2 grow lg:flex lg:basis-auto'>
              <div></div>
              <ul className=''>
                <li
                  onClick={() => {
                    GUIState.menuOpen = !GUIState.menuOpen
                  }}
                  className='flex items-center'
                >
                  <span
                    className='inline-block px-8 py-2 mb-0 mr-4 text-xs font-bold text-center text-white uppercase align-middle border border-solid rounded-lg shadow-none cursor-pointer leading-pro border-white/75 bg-white/10 ease-soft-in hover:scale-102 active:shadow-soft-xs tracking-tight-soft hover:border-white hover:bg-transparent hover:text-white hover:opacity-75 hover:shadow-none active:bg-white active:text-black active:hover:bg-transparent active:hover:text-white'
                    target='_blank'
                    rel='noreferrer'
                  >
                    Menu
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className='w-full px-6 mx-auto'>
          <div
            className='relative flex items-center p-0 mt-6 overflow-hidden bg-center bg-cover min-h-75 rounded-2xl'
            style={{
              backgroundImage: `url("${encodeURI(bgImage)}")`,
              backgroundPositionY: bgOffsetY + '%',
              backgroundColor: '#444444',
            }}
          >
            {/* from-purple-700 to-pink-500 */}
            <span className='absolute inset-y-0 w-full h-full bg-center bg-cover bg-gradient-to-tl  opacity-60' />
          </div>

          {bar && (
            <div
              style={{ height: `118px` }}
              className='relative flex flex-col flex-auto min-w-0 p-4 mx-6 -mt-32 overflow-hidden break-words bg-white border-0 shadow-blur rounded-2xl bg-opacity-80 bg-clip-border backdrop-blur-2xl backdrop-saturate-200'
            >
              {bar}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
