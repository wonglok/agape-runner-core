import {
  loginEth,
  loginGoogle,
  loginGuest,
  loginGuestLocal,
} from '@/auth/GateMethods'
import { StylesDashboard } from '../Home/Compos/StylesDashboard'
import { useEffect } from 'react'
import { SESSION_REDIRECT_KEY } from '@/auth/GateConst'

export function WelcomeBack() {
  return (
    <div>
      <StylesDashboard></StylesDashboard>

      <div>
        <div className='container sticky top-0 z-sticky'>
          <div className='flex flex-wrap -mx-3'>
            <div className='w-full max-w-full px-3 flex-0'>
              {/* Navbar */}
              <nav className='absolute top-0 left-0 right-0 z-30 flex flex-wrap items-center px-4 py-2 mx-6 my-4 shadow-soft-2xl rounded-blur bg-white/80 backdrop-blur-2xl backdrop-saturate-200 lg:flex-nowrap lg:justify-start'>
                <div className='flex items-center justify-center w-full p-0 pl-6 mx-auto flex-wrap-inherit'>
                  <a
                    className='ml-4 mr-4 text-sm font-bold py-2.375 whitespace-nowrap text-slate-700 lg:ml-0'
                    href='/'
                  >
                    AGAPE METAVERSE PORTAL
                  </a>

                  <div
                    navbar-menu
                    className='items-center flex-grow overflow-hidden transition-all duration-500 ease-soft lg-max:max-h-0 basis-full lg:flex lg:basis-auto'
                  >
                    <div className='flex flex-col pl-0 mx-auto mb-0 list-none lg:flex-row xl:ml-auto '></div>
                    {false && (
                      <ul className='flex flex-col pl-0 mx-auto mb-0 list-none lg:flex-row xl:ml-auto'>
                        <li>
                          <a
                            className='flex items-center px-4 py-2 mr-2 text-sm font-normal transition-all lg-max:opacity-0 duration-250 ease-soft-in-out text-slate-700 lg:px-2'
                            aria-current='page'
                            href='/'
                          >
                            <i className='mr-1 fa fa-chart-pie opacity-60' />
                            Dashboard
                          </a>
                        </li>
                        <li>
                          <a
                            className='block px-4 py-2 mr-2 text-sm font-normal transition-all lg-max:opacity-0 duration-250 ease-soft-in-out text-slate-700 lg:px-2'
                            href='../pages/profile.html'
                          >
                            <i className='mr-1 fa fa-user opacity-60' />
                            Profile
                          </a>
                        </li>
                        <li>
                          <a
                            className='block px-4 py-2 mr-2 text-sm font-normal transition-all lg-max:opacity-0 duration-250 ease-soft-in-out text-slate-700 lg:px-2'
                            href='../pages/sign-up.html'
                          >
                            <i className='mr-1 fas fa-user-circle opacity-60' />
                            Sign Up
                          </a>
                        </li>
                        <li>
                          <a
                            className='block px-4 py-2 mr-2 text-sm font-normal transition-all lg-max:opacity-0 duration-250 ease-soft-in-out text-slate-700 lg:px-2'
                            href='../pages/sign-in.html'
                          >
                            <i className='mr-1 fas fa-key opacity-60' />
                            Sign In
                          </a>
                        </li>
                      </ul>
                    )}
                    <ul className='flex flex-col pl-0 mx-auto mb-0 list-none lg:flex-row xl:ml-auto'>
                      {/* <li>
                        <a
                          className='flex items-center px-4 py-2 mr-2 text-sm font-normal transition-all lg-max:opacity-0 duration-250 ease-soft-in-out text-slate-700 lg:px-2'
                          aria-current='page'
                          href='/store'
                        >
                          <i className='mr-1 fa fa-chart-pie opacity-60' />
                          App Store
                        </a>
                      </li> */}
                      {/* <li>
                        <a
                          className='flex items-center px-4 py-2 mr-2 text-sm font-normal transition-all lg-max:opacity-0 duration-250 ease-soft-in-out text-slate-700 lg:px-2'
                          aria-current='page'
                          href='/avatar'
                        >
                          <i className='mr-1 fa fa-chart-pie opacity-60' />
                          Avatars
                        </a>
                      </li> */}
                    </ul>

                    {/* online builder btn  */}
                    {/* <li class="flex items-center">
                  <a
                    class="leading-pro ease-soft-in text-fuchsia-500 border-fuchsia-500 text-xs tracking-tight-soft bg-150 bg-x-25 rounded-3.5xl hover:border-fuchsia-500 hover:scale-102 hover:text-fuchsia-500 active:hover:border-fuchsia-500 active:hover:scale-102 active:hover:text-fuchsia-500 active:opacity-85 active:shadow-soft-xs active:bg-fuchsia-500 active:border-fuchsia-500 mr-2 mb-0 inline-block cursor-pointer border border-solid bg-transparent py-2 px-8 text-center align-middle font-bold uppercase shadow-none transition-all hover:bg-transparent hover:opacity-75 hover:shadow-none active:scale-100 active:text-white active:hover:bg-transparent active:hover:opacity-75 active:hover:shadow-none"
                    target="_blank"
                    href="https://www.creative-tim.com/builder/soft-ui?ref=navbar-dashboard&amp;_ga=2.76518741.1192788655.1647724933-1242940210.1644448053"
                    >Online Builder</a
                  >
                </li> */}

                    <ul className='hidden pl-0 mb-0 list-none lg:block lg:flex-row'>
                      <li>
                        <a
                          href='/'
                          target='_blank'
                          className='inline-block px-8 py-2 mb-0 mr-1 text-xs font-bold text-center text-white uppercase align-middle bg-transparent border-0 cursor-pointer leading-pro hover:scale-102 hover:shadow-soft-xs active:opacity-85 ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-gray-900 to-slate-800 rounded-3.5xl transition-all'
                          rel='noreferrer'
                        >
                          Home
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
        <main className='mt-0 transition-all duration-200 ease-soft-in-out'>
          <section>
            <div className='relative flex items-center p-0 overflow-hidden bg-center bg-cover min-h-75-screen'>
              <div className='container z-10'>
                <div className='flex flex-wrap mt-0 -mx-3'>
                  <div className='flex flex-col w-full max-w-full px-3 mx-auto md:flex-0 shrink-0 md:w-6/12 lg:w-5/12 xl:w-4/12'>
                    <div className='relative flex flex-col min-w-0 mt-32 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border'>
                      <div className='p-6 pb-0 mb-0 bg-transparent border-b-0 rounded-t-2xl'>
                        <h3 className='relative z-10 font-bold text-transparent bg-gradient-to-tl from-blue-600 to-cyan-400 bg-clip-text'>
                          Welcome back!
                        </h3>
                        <p className='mb-0'>Please login to continue</p>
                      </div>
                      <div className='flex-auto p-6'>
                        <div>
                          <div className='text-center'>
                            <button
                              type='button'
                              onClick={() => {
                                //
                                loginGoogle()
                              }}
                              className='inline-block w-full px-6 py-3 mt-6 mb-0 text-xs font-bold text-center text-white uppercase align-middle bg-transparent border-0 rounded-lg cursor-pointer transition-all shadow-soft-md bg-x-25 bg-150 leading-pro ease-soft-in tracking-tight-soft bg-gradient-to-tl from-blue-600 to-cyan-400 hover:scale-102 hover:shadow-soft-xs active:opacity-85'
                            >
                              Google
                            </button>
                          </div>
                          {/* <div className='text-center'>
                            <button
                              type='button'
                              onClick={() => {
                                //
                                loginGuest()
                              }}
                              className='inline-block w-full px-6 py-3 mt-6 mb-0 text-xs font-bold text-center text-white uppercase align-middle bg-transparent border-0 rounded-lg cursor-pointer transition-all shadow-soft-md bg-x-25 bg-150 leading-pro ease-soft-in tracking-tight-soft bg-gradient-to-tl from-cyan-600 to-green-400 hover:scale-102 hover:shadow-soft-xs active:opacity-85'
                            >
                              Guest
                            </button>
                          </div> */}

                          <div className='text-center'>
                            <button
                              type='button'
                              onClick={() => {
                                //
                                loginEth()
                              }}
                              className='inline-block w-full px-6 py-3 mt-6 mb-0 text-xs font-bold text-center text-white uppercase align-middle bg-transparent border-0 rounded-lg cursor-pointer transition-all shadow-soft-md bg-x-25 bg-150 leading-pro ease-soft-in tracking-tight-soft bg-gradient-to-tl from-orange-600 to-yellow-400 hover:scale-102 hover:shadow-soft-xs active:opacity-85'
                            >
                              Metamask
                            </button>
                          </div>

                          {process.env.NODE_ENV === 'development' && (
                            <div className='text-center'>
                              <button
                                type='button'
                                onClick={() => {
                                  //
                                  loginGuestLocal()
                                }}
                                className='inline-block w-full px-6 py-3 mt-6 mb-0 text-xs font-bold text-center text-white uppercase align-middle bg-transparent border-0 rounded-lg cursor-pointer transition-all shadow-soft-md bg-x-25 bg-150 leading-pro ease-soft-in tracking-tight-soft bg-gradient-to-tl from-blue-600 to-red-400 hover:scale-102 hover:shadow-soft-xs active:opacity-85'
                              >
                                Dev Guest
                              </button>
                            </div>
                          )}
                        </div>
                        {/* <form role='form'>
                          <label className='mb-2 ml-1 text-xs font-bold text-slate-700'>
                            Email
                          </label>
                          <div className='mb-4'>
                            <input
                              type='email'
                              className='block w-full px-3 py-2 text-sm font-normal text-gray-700 bg-white border border-gray-300 border-solid rounded-lg appearance-none focus:shadow-soft-primary-outline leading-5.6 ease-soft bg-clip-padding transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow'
                              placeholder='Email'
                              aria-label='Email'
                              aria-describedby='email-addon'
                            />
                          </div>
                          <label className='mb-2 ml-1 text-xs font-bold text-slate-700'>
                            Password
                          </label>
                          <div className='mb-4'>
                            <input
                              type='email'
                              className='block w-full px-3 py-2 text-sm font-normal text-gray-700 bg-white border border-gray-300 border-solid rounded-lg appearance-none focus:shadow-soft-primary-outline leading-5.6 ease-soft bg-clip-padding transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow'
                              placeholder='Password'
                              aria-label='Password'
                              aria-describedby='password-addon'
                            />
                          </div>
                          <div className='block pl-12 min-h-6 mb-0.5'>
                            <input
                              id='rememberMe'
                              className="relative float-left w-10 h-5 -ml-12 align-top bg-left bg-no-repeat bg-contain border border-gray-200 border-solid appearance-none cursor-pointer mt-0.54 rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl after:duration-250 checked:after:translate-x-5.25 bg-slate-800/10 bg-none transition-all after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right"
                              type='checkbox'
                              defaultChecked
                            />
                            <label
                              className='mb-2 ml-1 text-sm font-normal cursor-pointer select-none text-slate-700'
                              htmlFor='rememberMe'
                            >
                              Remember me
                            </label>
                          </div>
                          <div className='text-center'>
                            <button
                              type='button'
                              className='inline-block w-full px-6 py-3 mt-6 mb-0 text-xs font-bold text-center text-white uppercase align-middle bg-transparent border-0 rounded-lg cursor-pointer transition-all shadow-soft-md bg-x-25 bg-150 leading-pro ease-soft-in tracking-tight-soft bg-gradient-to-tl from-blue-600 to-cyan-400 hover:scale-102 hover:shadow-soft-xs active:opacity-85'
                            >
                              Sign in
                            </button>
                          </div>
                        </form> */}
                      </div>
                      {/* <div className='p-6 px-1 pt-0 text-center bg-transparent border-t-0 border-t-solid rounded-b-2xl lg:px-2'>
                        <p className='mx-auto mb-6 text-sm leading-normal'>
                          Don't have an account?
                          <a
                            href='../pages/sign-up.html'
                            className='relative z-10 font-semibold text-transparent bg-gradient-to-tl from-blue-600 to-cyan-400 bg-clip-text'
                          >
                            Sign up
                          </a>
                        </p>
                      </div> */}
                    </div>
                  </div>
                  {/*  */}

                  {/*  */}

                  {/*  */}
                  <div className='w-full max-w-full px-3 lg:flex-0 shrink-0 md:w-6/12'>
                    <img
                      className='hidden mt-2 -ml-12 rounded-full md:block'
                      src={`/scene/2022-11-28-NYC/coverimage/agape_square_image.jpg`}
                    ></img>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className='py-12'>
          <div className='container'>
            {false && (
              <div className='flex flex-wrap -mx-3'>
                <div className='flex-shrink-0 w-full max-w-full mx-auto mb-6 text-center lg:flex-0 lg:w-8/12'>
                  <a
                    data-stuff='javascript:;'
                    target='_blank'
                    className='mb-2 mr-4 text-slate-400 sm:mb-0 xl:mr-12'
                    rel='noreferrer'
                  >
                    {' '}
                    Company{' '}
                  </a>
                  <a
                    data-stuff='javascript:;'
                    target='_blank'
                    className='mb-2 mr-4 text-slate-400 sm:mb-0 xl:mr-12'
                    rel='noreferrer'
                  >
                    {' '}
                    About Us{' '}
                  </a>
                  <a
                    data-stuff='javascript:;'
                    target='_blank'
                    className='mb-2 mr-4 text-slate-400 sm:mb-0 xl:mr-12'
                    rel='noreferrer'
                  >
                    {' '}
                    Team{' '}
                  </a>
                  <a
                    data-stuff='javascript:;'
                    target='_blank'
                    className='mb-2 mr-4 text-slate-400 sm:mb-0 xl:mr-12'
                    rel='noreferrer'
                  >
                    {' '}
                    Products{' '}
                  </a>
                  <a
                    data-stuff='javascript:;'
                    target='_blank'
                    className='mb-2 mr-4 text-slate-400 sm:mb-0 xl:mr-12'
                    rel='noreferrer'
                  >
                    {' '}
                    Blog{' '}
                  </a>
                  <a
                    data-stuff='javascript:;'
                    target='_blank'
                    className='mb-2 mr-4 text-slate-400 sm:mb-0 xl:mr-12'
                    rel='noreferrer'
                  >
                    {' '}
                    Pricing{' '}
                  </a>
                </div>
                <div className='flex-shrink-0 w-full max-w-full mx-auto mt-2 mb-6 text-center lg:flex-0 lg:w-8/12'>
                  <a
                    data-stuff='javascript:;'
                    target='_blank'
                    className='mr-6 text-slate-400'
                    rel='noreferrer'
                  >
                    <span className='text-lg fab fa-dribbble' />
                  </a>
                  <a
                    data-stuff='javascript:;'
                    target='_blank'
                    className='mr-6 text-slate-400'
                    rel='noreferrer'
                  >
                    <span className='text-lg fab fa-twitter' />
                  </a>
                  <a
                    data-stuff='javascript:;'
                    target='_blank'
                    className='mr-6 text-slate-400'
                    rel='noreferrer'
                  >
                    <span className='text-lg fab fa-instagram' />
                  </a>
                  <a
                    data-stuff='javascript:;'
                    target='_blank'
                    className='mr-6 text-slate-400'
                    rel='noreferrer'
                  >
                    <span className='text-lg fab fa-pinterest' />
                  </a>
                  <a
                    data-stuff='javascript:;'
                    target='_blank'
                    className='mr-6 text-slate-400'
                    rel='noreferrer'
                  >
                    <span className='text-lg fab fa-github' />
                  </a>
                </div>
              </div>
            )}
            <div className='flex flex-wrap -mx-3'>
              <div className='w-8/12 max-w-full px-3 mx-auto mt-1 text-center flex-0'>
                <p className='mb-0 text-slate-400'>
                  Thank you for using AGAPE.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
