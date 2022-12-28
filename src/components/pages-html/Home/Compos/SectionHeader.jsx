import { signOut } from '@/auth/GateMethods'
import { GateState } from '@/auth/GateState.ts'
import { useSnapshot } from 'valtio'

export function SectionHeader({
  title = 'Dashboard',
  subTitle = `Metaverse Overview`,
  bgImage = '../assets/img/curved-images/curved0.jpg',
  bgOffsetY = '50',
}) {
  let gs = useSnapshot(GateState)
  return (
    <>
      <nav
        className='absolute z-20 flex flex-wrap items-center justify-between w-full px-6 py-2 text-white shadow-none transition-all duration-250 ease-soft-in lg:flex-nowrap lg:justify-start'
        navbar-scroll='true'
      >
        <div className='flex items-center justify-between w-full px-6 py-1 mx-auto flex-wrap-inherit'>
          <nav>
            {/* breadcrumb */}
            <ol className='flex flex-wrap pt-1 pl-2 pr-4 mr-12 bg-transparent rounded-lg sm:mr-16'>
              <li
                className='text-sm leading-normal capitalize'
                aria-current='page'
              >
                Portal
              </li>
              <li
                className="pl-2 text-sm leading-normal capitalize before:float-left before:pr-2 before:content-['/']"
                aria-current='page'
              >
                {title} Page
              </li>
            </ol>
            <h6 className='ml-2 text-3xl font-bold text-white capitalize'>
              {title}
            </h6>
            <h4 className='mb-2 ml-2 -mt-2 text-xl font-normal text-gray-100 capitalize'>
              {subTitle}
            </h4>
          </nav>
          <div className='flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto'>
            <div className='flex items-center md:ml-auto md:pr-4'>
              <div className='relative flex flex-wrap items-stretch w-full rounded-lg transition-all ease-soft'>
                {/* <span className='absolute z-50 flex items-center h-full py-2 -ml-px text-sm font-normal text-center bg-transparent border border-r-0 border-transparent rounded-lg rounded-tr-none rounded-br-none ease-soft leading-5.6 whitespace-nowrap px-2.5 text-slate-500 transition-all'>
                      <i className='fas fa-search' aria-hidden='true' />
                    </span>
                    <input
                      type='text'
                      className='relative flex-auto block min-w-0 py-2 pr-3 -ml-px text-sm text-gray-700 bg-white border border-gray-300 border-solid rounded-lg pl-8.75 focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 bg-clip-padding transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none focus:transition-shadow'
                      placeholder='Type here...'
                    /> */}

                {/* \ */}
              </div>
            </div>
            <ul className='flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full'>
              {/* online builder btn  */}
              {/* <li class="flex items-center">
                <a class="inline-block px-8 py-2 mb-0 mr-4 font-bold text-center text-white uppercase align-middle transition-all border border-solid rounded-lg shadow-none cursor-pointer leading-pro border-white/75 bg-white/10 ease-soft-in text-xs hover:scale-102 active:shadow-soft-xs tracking-tight-soft hover:border-white hover:bg-transparent hover:text-white hover:opacity-75 hover:shadow-none active:bg-white active:text-black active:hover:bg-transparent active:hover:text-white" target="_blank" href="https://www.creative-tim.com/builder/soft-ui?ref=navbar-dashboard&amp;_ga=2.76518741.1192788655.1647724933-1242940210.1644448053">Online Builder</a>
              </li> */}
              <li className='flex items-center'>
                <a
                  onClick={() => {
                    signOut()
                  }}
                  className='block px-0 py-2 text-sm font-semibold text-white transition-all ease-soft-in-out'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    className='fill-white'
                  >
                    <path d='M21 14.874v-1.814h-3.25c-.745 0-1.128-.26-1.451-.706l-1.709-2.302-2.791 3.024 1.509 2.149c.478.753.514 1.267.514 1.952v5.823h-2.699v-5.474c-.021-1.512-2.455-2.945-3.303-1.723l-1.617 2.281c-.359.51-.971.686-1.565.686h-4.638v-2.621l3.483-.003c.544 0 1.017-.193 1.274-.806l1.549-3.782c.269-.563.632-1.076 1.076-1.515l3.609-3.573-1.02-.891c-.306-.267-.716-.381-1.116-.311l-2.999.525-.471-2.201 4.115-.784c.771-.147 1.433.103 2.009.636l3.961 3.656c.628.57 1.272 1.563 2.276 3.047.184.272.443.656 1.053.656h2.201v-1.85l3 2.96-3 2.961zm-3.101-8.747c1.403-.268 2.323-1.623 2.055-3.026-.269-1.403-1.624-2.323-3.026-2.055-1.403.269-2.323 1.624-2.055 3.026.268 1.404 1.623 2.324 3.026 2.055z' />
                  </svg>
                  {/*  */}
                  <span className='hidden ml-3 sm:inline'>Sign Out</span>
                </a>
              </li>

              {/*  */}
              {/*  */}
              {/*  */}
              {/* <li className='flex items-center pl-4 xl:hidden'>
                    <a
                      data-stuff='javascript:;'
                      className='block p-0 text-sm text-white transition-all ease-soft-in-out'
                      sidenav-trigger
                    >
                      <div className='overflow-hidden w-4.5'>
                        <i className='relative block bg-white rounded-sm ease-soft mb-0.75 h-0.5 transition-all' />
                        <i className='relative block bg-white rounded-sm ease-soft mb-0.75 h-0.5 transition-all' />
                        <i className='relative block bg-white rounded-sm ease-soft h-0.5 transition-all' />
                      </div>
                    </a>
                  </li> */}
              <li className='flex items-center px-4'>
                <a
                  data-stuff='javascript:;'
                  className='p-0 text-sm text-white transition-all ease-soft-in-out'
                >
                  <i className='cursor-pointer fa fa-cog' aria-hidden='true' />
                </a>
              </li>
              {/* notifications */}
              <li className='relative flex items-center pr-2'>
                <p className='hidden transform-dropdown-show' />
                <a
                  data-stuff='javascript:;'
                  className='block p-0 text-sm text-white transition-all ease-nav-brand'
                  aria-expanded='false'
                >
                  <i className='cursor-pointer fa fa-bell' aria-hidden='true' />
                </a>
                <ul className="absolute top-0 right-0 z-50 px-2 py-4 text-sm text-left list-none bg-white border-0 border-transparent border-solid rounded-lg opacity-0 pointer-events-none transform-dropdown before:font-awesome before:leading-default before:duration-350 before:ease-soft lg:shadow-soft-3xl duration-250 min-w-44 before:sm:right-7.5 before:text-5.5 origin-top bg-clip-padding text-slate-500 transition-all before:absolute before:right-2 before:left-auto before:top-0 before:z-50 before:inline-block before:font-normal before:text-white before:antialiased before:transition-all before:content-['\f0d8'] sm:-mr-6 lg:absolute lg:right-0 lg:left-auto lg:mt-2 lg:block lg:cursor-pointer">
                  {/* add show class on dropdown open js */}
                  <li className='relative mb-2'>
                    <a
                      className='block w-full px-4 bg-transparent rounded-lg ease-soft py-1.2 clear-both whitespace-nowrap duration-300 lg:transition-colors'
                      data-stuff='javascript:;'
                    >
                      <div className='flex py-1'>
                        <div className='my-auto'>
                          <img
                            src='../assets/img/team-2.jpg'
                            className='inline-flex items-center justify-center mr-4 text-sm text-white h-9 w-9 max-w-none rounded-xl'
                          />
                        </div>
                        <div className='flex flex-col justify-center'>
                          <h6 className='mb-1 text-sm font-normal leading-normal'>
                            <span className='font-semibold'>New message</span>{' '}
                            from Laur
                          </h6>
                          <p className='mb-0 text-xs leading-tight text-slate-400'>
                            <i
                              className='mr-1 fa fa-clock'
                              aria-hidden='true'
                            />
                            {/*  */}
                            13 minutes ago
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className='relative mb-2'>
                    <a
                      className='block w-full px-4 rounded-lg ease-soft py-1.2 clear-both whitespace-nowrap duration-300 lg:transition-colors'
                      data-stuff='javascript:;'
                    >
                      <div className='flex py-1'>
                        <div className='my-auto'>
                          <img
                            src='../assets/img/small-logos/logo-spotify.svg'
                            className='inline-flex items-center justify-center mr-4 text-sm text-white bg-gradient-to-tl from-gray-900 to-slate-800 h-9 w-9 max-w-none rounded-xl'
                          />
                        </div>
                        {/*  */}
                        {/*  */}
                        <div className='flex flex-col justify-center'>
                          <h6 className='mb-1 text-sm font-normal leading-normal'>
                            <span className='font-semibold'>New album</span> by
                            Travis Scott
                          </h6>
                          <p className='mb-0 text-xs leading-tight text-slate-400'>
                            <i
                              className='mr-1 fa fa-clock'
                              aria-hidden='true'
                            />
                            1 day
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className='relative'>
                    <a
                      className='block w-full px-4 rounded-lg ease-soft py-1.2 clear-both whitespace-nowrap duration-300 lg:transition-colors'
                      data-stuff='javascript:;'
                    >
                      <div className='flex py-1'>
                        <div className='inline-flex items-center justify-center my-auto mr-4 text-sm text-white transition-all duration-200 ease-soft-in-out bg-gradient-to-tl from-slate-600 to-slate-300 h-9 w-9 rounded-xl'>
                          <svg
                            width='12px'
                            height='12px'
                            viewBox='0 0 43 36'
                            version='1.1'
                            xmlns='http://www.w3.org/2000/svg'
                            xmlnsXlink='http://www.w3.org/1999/xlink'
                          >
                            <title>credit-card</title>
                            <g
                              stroke='none'
                              strokeWidth={1}
                              fill='none'
                              fillRule='evenodd'
                            >
                              <g
                                transform='translate(-2169.000000, -745.000000)'
                                fill='#FFFFFF'
                                fillRule='nonzero'
                              >
                                <g transform='translate(1716.000000, 291.000000)'>
                                  <g transform='translate(453.000000, 454.000000)'>
                                    <path
                                      className='color-background'
                                      d='M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z'
                                      opacity='0.593633743'
                                    />
                                    <path
                                      className='color-background'
                                      d='M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z'
                                    />
                                  </g>
                                </g>
                              </g>
                            </g>
                          </svg>
                        </div>
                        <div className='flex flex-col justify-center'>
                          <h6 className='mb-1 text-sm font-normal leading-normal'>
                            Payment successfully completed
                          </h6>
                          <p className='mb-0 text-xs leading-tight text-slate-400'>
                            <i
                              className='mr-1 fa fa-clock'
                              aria-hidden='true'
                            />
                            2 days
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
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
          }}
        >
          {/* from-purple-700 to-pink-500 */}
          <span className='absolute inset-y-0 w-full h-full bg-center bg-cover bg-gradient-to-tl  opacity-60' />
        </div>

        <div className='relative flex flex-col flex-auto min-w-0 p-4 mx-6 -mt-32 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border backdrop-blur-2xl backdrop-saturate-200'>
          <div className='flex flex-wrap -mx-3'>
            <div className='flex-none w-auto max-w-full px-3'>
              <div className='relative inline-flex items-center justify-center text-base text-white ease-soft-in-out h-18.5 w-18.5 rounded-xl transition-all duration-200'>
                <img
                  src={
                    gs.userSession.picture ||
                    '../scene/2022-11-28-NYC/coverimage/agape.png'
                  }
                  alt='profile_image'
                  className='w-full shadow-soft-sm rounded-xl'
                />
              </div>
            </div>
            {/* {JSON.stringify(gs.userSession)} */}
            <div className='flex-none w-auto max-w-full px-3 my-auto'>
              <div className='h-full'>
                <h5 className='mb-1'>{gs.userSession.name}</h5>
                <p className='mb-0 text-sm font-semibold leading-normal'>
                  Welcome Back!
                </p>
              </div>
            </div>
            {false && (
              <div className='w-full max-w-full px-3 mx-auto mt-4 sm:my-auto sm:mr-0 md:w-1/2 md:flex-none lg:w-4/12'>
                <div className='relative right-0'>
                  <ul
                    className='relative flex flex-wrap p-1 list-none bg-transparent rounded-xl'
                    nav-pills
                    role='tablist'
                  >
                    <li className='z-30 flex-auto text-center'>
                      <a
                        className='z-30 block w-full px-0 py-1 mb-0 border-0 rounded-lg transition-all ease-soft-in-out bg-inherit text-slate-700'
                        nav-link
                        active
                        data-stuff='javascript:;'
                        role='tab'
                        aria-selected='true'
                      >
                        <svg
                          width='24'
                          height='24'
                          xmlns='http://www.w3.org/2000/svg'
                          fillRule='evenodd'
                          clipRule='evenodd'
                          className='fill-slate-800  scale-75'
                        >
                          <path d='M1.886 14.826l2.534 4.24-.669.155c-.67.154-1.152.529-1.356 1.052-.161.416-.124.875.099 1.199.24.352.64.553 1.097.553.808 0 1.6-.635 1.835-1.424.102-.339.148-.865-.206-1.441l-2.803-4.656-.531.322zm1.705 8.199c-.792 0-1.493-.359-1.921-.984-.407-.596-.486-1.41-.206-2.129.25-.643.755-1.15 1.427-1.453l-2.374-3.972 2.239-1.359 3.317 5.512c.426.69.537 1.491.311 2.248-.276.926-1.288 2.137-2.793 2.137m14.433.975c.275-.01.491-.24.482-.518-.057-1.629.359-1.939 1.376-2.052 1.502-.17 1.71-1.084 1.86-1.752.161-.707.267-1.176 1.78-1.256.275-.014.487-.248.471-.526-.012-.275-.243-.49-.524-.472-2.095.109-2.473 1.025-2.701 2.033-.139.609-.201.889-.997.978-2.075.233-2.315 1.62-2.265 3.082.01.27.232.483.5.483h.018zm2.665-11.032l.811.388-.118-.893.62-.653-.886-.164-.427-.792-.429.792-.885.164.62.653-.119.893.813-.388zm2.046 2.087l-2.046-.978-2.047.978.299-2.25-1.564-1.644 2.231-.412 1.081-1.996 1.08 1.996 2.23.412-1.562 1.644.298 2.25zm-9.622-14.054c-.291 0-.573.062-.839.185-1.008.464-1.451 1.663-.988 2.672.449.977 1.685 1.441 2.671.989.489-.226.86-.627 1.046-1.132.187-.505.165-1.052-.059-1.541-.328-.712-1.046-1.173-1.831-1.173m.004 5.031c-1.173 0-2.249-.689-2.739-1.755-.693-1.511-.031-3.305 1.478-4 .398-.183.821-.276 1.257-.276 1.174 0 2.25.689 2.739 1.755.336.731.367 1.55.089 2.305-.279.757-.835 1.358-1.566 1.694-.398.184-.821.277-1.258.277m-7.384-2.536c.911 1.47 3.573 5.365 3.573 5.365l-.785 3.399c-.237.886-.13 1.453.047 2.159l2.076 8.591.386-7.645 4.354 1.984s-.602 3.082-.804 4.135c0 0 1.429-3.385 1.772-4.228.138-.342.074-.547-.301-.961-.704-.783-2.549-2.706-2.549-2.706l.791-3.449s4.197-2.938 5.469-3.912c.064-.048.063-.085.053-.114l-.09-.066c-.888.334-2.443 1.008-3.63 1.522l-1.165.504c-.366.156-.775.189-1.16.09l-3.325-.836c-.368-.092-.712-.273-.996-.526l-3.716-3.306zm4.921 20.492c-.401-.002-.891-.248-1.059-.937-.498-2.034-1.999-8.395-1.999-8.395-.197-.791-.338-1.54-.045-2.638l.682-2.955c-.521-.763-2.542-3.727-3.339-4.938-.223-.34-.249-.742-.069-1.077.297-.551 1.101-.719 1.571-.3l3.717 3.306c.164.145.363.251.575.304l3.326.836c.173.045.358.03.523-.041l1.162-.501c1.196-.518 2.765-1.198 3.573-1.516.616-.244 1.291.068 1.491.657.151.449-.003.932-.394 1.231-1.159.886-4.42 3.177-5.187 3.716l-.584 2.546c.456.477 1.63 1.71 2.194 2.337.445.49.85 1.113.486 2.012-.343.845-.958 2.298-1.416 3.384l-.366.866c-.284.675-1.263.837-1.698.31-.195-.236-.266-.557-.2-.898.155-.809.5-2.578.653-3.364l-2.284-1.041c-.067 1.557-.22 5.104-.274 6.075-.033.591-.47 1.021-1.039 1.021m-7.72-17.988l-2.934 2.937 2.934 2.937 2.935-2.937-2.935-2.937zm0 1.415l1.521 1.522-1.521 1.522-1.52-1.522 1.52-1.522z' />
                        </svg>
                        <span className='ml-1'>Avatars</span>
                      </a>
                    </li>
                    <li className='z-30 flex-auto text-center'>
                      <a
                        className='z-30 block w-full px-0 py-1 mb-0 border-0 rounded-lg transition-all ease-soft-in-out bg-inherit text-slate-700'
                        nav-link
                        active
                        data-stuff='javascript:;'
                        role='tab'
                        aria-selected='true'
                      >
                        <svg
                          width='24'
                          height='24'
                          xmlns='http://www.w3.org/2000/svg'
                          fillRule='evenodd'
                          clipRule='evenodd'
                          className='fill-slate-800  scale-75'
                        >
                          <path d='M1.886 14.826l2.534 4.24-.669.155c-.67.154-1.152.529-1.356 1.052-.161.416-.124.875.099 1.199.24.352.64.553 1.097.553.808 0 1.6-.635 1.835-1.424.102-.339.148-.865-.206-1.441l-2.803-4.656-.531.322zm1.705 8.199c-.792 0-1.493-.359-1.921-.984-.407-.596-.486-1.41-.206-2.129.25-.643.755-1.15 1.427-1.453l-2.374-3.972 2.239-1.359 3.317 5.512c.426.69.537 1.491.311 2.248-.276.926-1.288 2.137-2.793 2.137m14.433.975c.275-.01.491-.24.482-.518-.057-1.629.359-1.939 1.376-2.052 1.502-.17 1.71-1.084 1.86-1.752.161-.707.267-1.176 1.78-1.256.275-.014.487-.248.471-.526-.012-.275-.243-.49-.524-.472-2.095.109-2.473 1.025-2.701 2.033-.139.609-.201.889-.997.978-2.075.233-2.315 1.62-2.265 3.082.01.27.232.483.5.483h.018zm2.665-11.032l.811.388-.118-.893.62-.653-.886-.164-.427-.792-.429.792-.885.164.62.653-.119.893.813-.388zm2.046 2.087l-2.046-.978-2.047.978.299-2.25-1.564-1.644 2.231-.412 1.081-1.996 1.08 1.996 2.23.412-1.562 1.644.298 2.25zm-9.622-14.054c-.291 0-.573.062-.839.185-1.008.464-1.451 1.663-.988 2.672.449.977 1.685 1.441 2.671.989.489-.226.86-.627 1.046-1.132.187-.505.165-1.052-.059-1.541-.328-.712-1.046-1.173-1.831-1.173m.004 5.031c-1.173 0-2.249-.689-2.739-1.755-.693-1.511-.031-3.305 1.478-4 .398-.183.821-.276 1.257-.276 1.174 0 2.25.689 2.739 1.755.336.731.367 1.55.089 2.305-.279.757-.835 1.358-1.566 1.694-.398.184-.821.277-1.258.277m-7.384-2.536c.911 1.47 3.573 5.365 3.573 5.365l-.785 3.399c-.237.886-.13 1.453.047 2.159l2.076 8.591.386-7.645 4.354 1.984s-.602 3.082-.804 4.135c0 0 1.429-3.385 1.772-4.228.138-.342.074-.547-.301-.961-.704-.783-2.549-2.706-2.549-2.706l.791-3.449s4.197-2.938 5.469-3.912c.064-.048.063-.085.053-.114l-.09-.066c-.888.334-2.443 1.008-3.63 1.522l-1.165.504c-.366.156-.775.189-1.16.09l-3.325-.836c-.368-.092-.712-.273-.996-.526l-3.716-3.306zm4.921 20.492c-.401-.002-.891-.248-1.059-.937-.498-2.034-1.999-8.395-1.999-8.395-.197-.791-.338-1.54-.045-2.638l.682-2.955c-.521-.763-2.542-3.727-3.339-4.938-.223-.34-.249-.742-.069-1.077.297-.551 1.101-.719 1.571-.3l3.717 3.306c.164.145.363.251.575.304l3.326.836c.173.045.358.03.523-.041l1.162-.501c1.196-.518 2.765-1.198 3.573-1.516.616-.244 1.291.068 1.491.657.151.449-.003.932-.394 1.231-1.159.886-4.42 3.177-5.187 3.716l-.584 2.546c.456.477 1.63 1.71 2.194 2.337.445.49.85 1.113.486 2.012-.343.845-.958 2.298-1.416 3.384l-.366.866c-.284.675-1.263.837-1.698.31-.195-.236-.266-.557-.2-.898.155-.809.5-2.578.653-3.364l-2.284-1.041c-.067 1.557-.22 5.104-.274 6.075-.033.591-.47 1.021-1.039 1.021m-7.72-17.988l-2.934 2.937 2.934 2.937 2.935-2.937-2.935-2.937zm0 1.415l1.521 1.522-1.521 1.522-1.52-1.522 1.52-1.522z' />
                        </svg>
                        <span className='ml-1'>Avatars</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
