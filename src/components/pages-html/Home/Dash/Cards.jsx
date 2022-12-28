export function Cards() {
  return (
    <>
      {/*  */}
      <div className='w-full p-6 mx-auto'>
        <div className='flex flex-wrap -mx-3'>
          <div className='w-full max-w-full px-3 xl:w-4/12'>
            <div className='relative flex flex-col h-full min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border'>
              <div className='p-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl'>
                <h6 className='mb-0'>Platform Settings</h6>
              </div>
              <div className='flex-auto p-4'>
                <h6 className='text-xs font-bold leading-tight uppercase text-slate-500'>
                  Account
                </h6>
                <ul className='flex flex-col pl-0 mb-0 rounded-lg'>
                  <li className='relative block px-0 py-2 bg-white border-0 rounded-t-lg text-inherit'>
                    <div className='block pl-0 min-h-6 mb-0.5'>
                      <input
                        id='follow'
                        className="relative float-left w-10 h-5 ml-auto align-top bg-left bg-no-repeat bg-contain border border-gray-200 border-solid appearance-none cursor-pointer mt-0.54 rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl after:duration-250 checked:after:translate-x-5.25 bg-slate-800/10 bg-none transition-all after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right"
                        type='checkbox'
                        defaultChecked
                      />
                      <label
                        htmlFor='follow'
                        className='w-4/5 mb-0 ml-4 overflow-hidden text-sm font-normal cursor-pointer select-none text-ellipsis whitespace-nowrap text-slate-500'
                      >
                        Email me when someone follows me
                      </label>
                    </div>
                  </li>
                  <li className='relative block px-0 py-2 bg-white border-0 text-inherit'>
                    <div className='block pl-0 min-h-6 mb-0.5'>
                      <input
                        id='answer'
                        className="relative float-left w-10 h-5 ml-auto align-top bg-left bg-no-repeat bg-contain border border-gray-200 border-solid appearance-none cursor-pointer mt-0.54 rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl after:duration-250 checked:after:translate-x-5.25 bg-slate-800/10 bg-none transition-all after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right"
                        type='checkbox'
                      />
                      <label
                        htmlFor='answer'
                        className='w-4/5 mb-0 ml-4 overflow-hidden text-sm font-normal cursor-pointer select-none text-ellipsis whitespace-nowrap text-slate-500'
                      >
                        Email me when someone answers on my post
                      </label>
                    </div>
                  </li>
                  <li className='relative block px-0 py-2 bg-white border-0 rounded-b-lg text-inherit'>
                    <div className='block pl-0 min-h-6 mb-0.5'>
                      <input
                        id='mention'
                        className="relative float-left w-10 h-5 ml-auto align-top bg-left bg-no-repeat bg-contain border border-gray-200 border-solid appearance-none cursor-pointer mt-0.54 rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl after:duration-250 checked:after:translate-x-5.25 bg-slate-800/10 bg-none transition-all after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right"
                        type='checkbox'
                        defaultChecked
                      />
                      <label
                        htmlFor='mention'
                        className='w-4/5 mb-0 ml-4 overflow-hidden text-sm font-normal cursor-pointer select-none text-ellipsis whitespace-nowrap text-slate-500'
                      >
                        Email me when someone mentions me
                      </label>
                    </div>
                  </li>
                </ul>
                <h6 className='mt-6 text-xs font-bold leading-tight uppercase text-slate-500'>
                  Application
                </h6>
                <ul className='flex flex-col pl-0 mb-0 rounded-lg'>
                  <li className='relative block px-0 py-2 bg-white border-0 rounded-t-lg text-inherit'>
                    <div className='block pl-0 min-h-6 mb-0.5'>
                      <input
                        id='launches projects'
                        className="relative float-left w-10 h-5 ml-auto align-top bg-left bg-no-repeat bg-contain border border-gray-200 border-solid appearance-none cursor-pointer mt-0.54 rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl after:duration-250 checked:after:translate-x-5.25 bg-slate-800/10 bg-none transition-all after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right"
                        type='checkbox'
                      />
                      <label
                        htmlFor='launches projects'
                        className='w-4/5 mb-0 ml-4 overflow-hidden text-sm font-normal cursor-pointer select-none text-ellipsis whitespace-nowrap text-slate-500'
                      >
                        New launches and projects
                      </label>
                    </div>
                  </li>
                  <li className='relative block px-0 py-2 bg-white border-0 text-inherit'>
                    <div className='block pl-0 min-h-6 mb-0.5'>
                      <input
                        id='product updates'
                        className="relative float-left w-10 h-5 ml-auto align-top bg-left bg-no-repeat bg-contain border border-gray-200 border-solid appearance-none cursor-pointer mt-0.54 rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl after:duration-250 checked:after:translate-x-5.25 bg-slate-800/10 bg-none transition-all after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right"
                        type='checkbox'
                        defaultChecked
                      />
                      <label
                        htmlFor='product updates'
                        className='w-4/5 mb-0 ml-4 overflow-hidden text-sm font-normal cursor-pointer select-none text-ellipsis whitespace-nowrap text-slate-500'
                      >
                        Monthly product updates
                      </label>
                    </div>
                  </li>
                  <li className='relative block px-0 py-2 pb-0 bg-white border-0 rounded-b-lg text-inherit'>
                    <div className='block pl-0 min-h-6 mb-0.5'>
                      <input
                        id='subscribe'
                        className="relative float-left w-10 h-5 ml-auto align-top bg-left bg-no-repeat bg-contain border border-gray-200 border-solid appearance-none cursor-pointer mt-0.54 rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl after:duration-250 checked:after:translate-x-5.25 bg-slate-800/10 bg-none transition-all after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right"
                        type='checkbox'
                      />
                      <label
                        htmlFor='subscribe'
                        className='w-4/5 mb-0 ml-4 overflow-hidden text-sm font-normal cursor-pointer select-none text-ellipsis whitespace-nowrap text-slate-500'
                      >
                        Subscribe to newsletter
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='w-full max-w-full px-3 lg-max:mt-6 xl:w-4/12'>
            <div className='relative flex flex-col h-full min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border'>
              <div className='p-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl'>
                <div className='flex flex-wrap -mx-3'>
                  <div className='flex items-center w-full max-w-full px-3 shrink-0 md:w-8/12 md:flex-none'>
                    <h6 className='mb-0'>Profile Information</h6>
                  </div>
                  <div className='w-full max-w-full px-3 text-right shrink-0 md:w-4/12 md:flex-none'>
                    <a
                      data-stuff='javascript:;'
                      data-target='tooltip_trigger'
                      data-placement='top'
                    >
                      <i className='text-sm leading-normal fas fa-user-edit text-slate-400' />
                    </a>
                    <div
                      data-target='tooltip'
                      className='hidden px-2 py-1 text-sm text-center text-white bg-black rounded-lg'
                      role='tooltip'
                    >
                      Edit Profile
                      <div
                        className="absolute invisible w-2 h-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"
                        data-popper-arrow
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex-auto p-4'>
                <p className='text-sm leading-normal'>
                  Hi, I’m Alec Thompson, Decisions: If you can’t decide, the
                  answer is no. If two equally difficult paths, choose the one
                  more painful in the short term (pain avoidance is creating an
                  illusion of equality).
                </p>
                <hr className='h-px my-6 bg-transparent bg-gradient-to-r from-transparent via-white to-transparent' />
                <ul className='flex flex-col pl-0 mb-0 rounded-lg'>
                  <li className='relative block px-4 py-2 pt-0 pl-0 text-sm leading-normal bg-white border-0 rounded-t-lg text-inherit'>
                    <strong className='text-slate-700'>Full Name:</strong>{' '}
                    &nbsp; Alec M. Thompson
                  </li>
                  <li className='relative block px-4 py-2 pl-0 text-sm leading-normal bg-white border-0 border-t-0 text-inherit'>
                    <strong className='text-slate-700'>Mobile:</strong> &nbsp;
                    (44) 123 1234 123
                  </li>
                  <li className='relative block px-4 py-2 pl-0 text-sm leading-normal bg-white border-0 border-t-0 text-inherit'>
                    <strong className='text-slate-700'>Email:</strong> &nbsp;
                    alecthompson@mail.com
                  </li>
                  <li className='relative block px-4 py-2 pl-0 text-sm leading-normal bg-white border-0 border-t-0 text-inherit'>
                    <strong className='text-slate-700'>Location:</strong> &nbsp;
                    USA
                  </li>
                  <li className='relative block px-4 py-2 pb-0 pl-0 bg-white border-0 border-t-0 rounded-b-lg text-inherit'>
                    <strong className='text-sm leading-normal text-slate-700'>
                      Social:
                    </strong>{' '}
                    &nbsp;
                    <a
                      className='inline-block py-0 pl-1 pr-2 mb-0 text-xs font-bold text-center text-blue-800 align-middle bg-transparent border-0 rounded-lg shadow-none cursor-pointer transition-all leading-pro ease-soft-in bg-none'
                      data-stuff='javascript:;'
                    >
                      <i className='fab fa-facebook fa-lg' />
                    </a>
                    <a
                      className='inline-block py-0 pl-1 pr-2 mb-0 text-xs font-bold text-center align-middle bg-transparent border-0 rounded-lg shadow-none cursor-pointer transition-all leading-pro ease-soft-in bg-none text-sky-600'
                      data-stuff='javascript:;'
                    >
                      <i className='fab fa-twitter fa-lg' />
                    </a>
                    <a
                      className='inline-block py-0 pl-1 pr-2 mb-0 text-xs font-bold text-center align-middle bg-transparent border-0 rounded-lg shadow-none cursor-pointer transition-all leading-pro ease-soft-in bg-none text-sky-900'
                      data-stuff='javascript:;'
                    >
                      <i className='fab fa-instagram fa-lg' />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='w-full max-w-full px-3 lg-max:mt-6 xl:w-4/12'>
            <div className='relative flex flex-col h-full min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border'>
              <div className='p-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl'>
                <h6 className='mb-0'>Conversations</h6>
              </div>
              <div className='flex-auto p-4'>
                <ul className='flex flex-col pl-0 mb-0 rounded-lg'>
                  <li className='relative flex items-center px-0 py-2 mb-2 bg-white border-0 rounded-t-lg text-inherit'>
                    <div className='inline-flex items-center justify-center w-12 h-12 mr-4 text-base text-white transition-all duration-200 ease-soft-in-out rounded-xl'>
                      <img
                        src='../assets/img/kal-visuals-square.jpg'
                        alt='kal'
                        className='w-full shadow-soft-2xl rounded-xl'
                      />
                    </div>
                    <div className='flex flex-col items-start justify-center'>
                      <h6 className='mb-0 text-sm leading-normal'>Sophie B.</h6>
                      <p className='mb-0 text-xs leading-tight'>
                        Hi! I need more information..
                      </p>
                    </div>
                    <a
                      className='inline-block py-3 pl-0 pr-4 mb-0 ml-auto text-xs font-bold text-center uppercase align-middle bg-transparent border-0 rounded-lg shadow-none cursor-pointer transition-all leading-pro ease-soft-in hover:scale-102 hover:active:scale-102 active:opacity-85 text-fuchsia-500 hover:text-fuchsia-800 hover:shadow-none active:scale-100'
                      data-stuff='javascript:;'
                    >
                      Reply
                    </a>
                  </li>
                  <li className='relative flex items-center px-0 py-2 mb-2 bg-white border-0 border-t-0 text-inherit'>
                    <div className='inline-flex items-center justify-center w-12 h-12 mr-4 text-base text-white transition-all duration-200 ease-soft-in-out rounded-xl'>
                      <img
                        src='../assets/img/marie.jpg'
                        alt='kal'
                        className='w-full shadow-soft-2xl rounded-xl'
                      />
                    </div>
                    <div className='flex flex-col items-start justify-center'>
                      <h6 className='mb-0 text-sm leading-normal'>
                        Anne Marie
                      </h6>
                      <p className='mb-0 text-xs leading-tight'>
                        Awesome work, can you..
                      </p>
                    </div>
                    <a
                      className='inline-block py-3 pl-0 pr-4 mb-0 ml-auto text-xs font-bold text-center uppercase align-middle bg-transparent border-0 rounded-lg shadow-none cursor-pointer transition-all leading-pro ease-soft-in hover:scale-102 hover:active:scale-102 active:opacity-85 text-fuchsia-500 hover:text-fuchsia-800 hover:shadow-none active:scale-100'
                      data-stuff='javascript:;'
                    >
                      Reply
                    </a>
                  </li>
                  <li className='relative flex items-center px-0 py-2 mb-2 bg-white border-0 border-t-0 text-inherit'>
                    <div className='inline-flex items-center justify-center w-12 h-12 mr-4 text-base text-white transition-all duration-200 ease-soft-in-out rounded-xl'>
                      <img
                        src='../assets/img/ivana-square.jpg'
                        alt='kal'
                        className='w-full shadow-soft-2xl rounded-xl'
                      />
                    </div>
                    <div className='flex flex-col items-start justify-center'>
                      <h6 className='mb-0 text-sm leading-normal'>Ivanna</h6>
                      <p className='mb-0 text-xs leading-tight'>
                        About files I can..
                      </p>
                    </div>
                    <a
                      className='inline-block py-3 pl-0 pr-4 mb-0 ml-auto text-xs font-bold text-center uppercase align-middle bg-transparent border-0 rounded-lg shadow-none cursor-pointer transition-all leading-pro ease-soft-in hover:scale-102 hover:active:scale-102 active:opacity-85 text-fuchsia-500 hover:text-fuchsia-800 hover:shadow-none active:scale-100'
                      data-stuff='javascript:;'
                    >
                      Reply
                    </a>
                  </li>
                  <li className='relative flex items-center px-0 py-2 mb-2 bg-white border-0 border-t-0 text-inherit'>
                    <div className='inline-flex items-center justify-center w-12 h-12 mr-4 text-base text-white transition-all duration-200 ease-soft-in-out rounded-xl'>
                      <img
                        src='../assets/img/team-4.jpg'
                        alt='kal'
                        className='w-full shadow-soft-2xl rounded-xl'
                      />
                    </div>
                    <div className='flex flex-col items-start justify-center'>
                      <h6 className='mb-0 text-sm leading-normal'>Peterson</h6>
                      <p className='mb-0 text-xs leading-tight'>
                        Have a great afternoon..
                      </p>
                    </div>
                    <a
                      className='inline-block py-3 pl-0 pr-4 mb-0 ml-auto text-xs font-bold text-center uppercase align-middle bg-transparent border-0 rounded-lg shadow-none cursor-pointer transition-all leading-pro ease-soft-in hover:scale-102 hover:active:scale-102 active:opacity-85 text-fuchsia-500 hover:text-fuchsia-800 hover:shadow-none active:scale-100'
                      data-stuff='javascript:;'
                    >
                      Reply
                    </a>
                  </li>
                  <li className='relative flex items-center px-0 py-2 bg-white border-0 border-t-0 rounded-b-lg text-inherit'>
                    <div className='inline-flex items-center justify-center w-12 h-12 mr-4 text-base text-white transition-all duration-200 ease-soft-in-out rounded-xl'>
                      <img
                        src='../assets/img/team-3.jpg'
                        alt='kal'
                        className='w-full shadow-soft-2xl rounded-xl'
                      />
                    </div>
                    <div className='flex flex-col items-start justify-center'>
                      <h6 className='mb-0 text-sm leading-normal'>
                        Nick Daniel
                      </h6>
                      <p className='mb-0 text-xs leading-tight'>
                        Hi! I need more information..
                      </p>
                    </div>
                    <a
                      className='inline-block py-3 pl-0 pr-4 mb-0 ml-auto text-xs font-bold text-center uppercase align-middle bg-transparent border-0 rounded-lg shadow-none cursor-pointer transition-all leading-pro ease-soft-in hover:scale-102 hover:active:scale-102 active:opacity-85 text-fuchsia-500 hover:text-fuchsia-800 hover:shadow-none active:scale-100'
                      data-stuff='javascript:;'
                    >
                      Reply
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <footer className='pt-4'>
          <div className='w-full px-6 mx-auto'>
            <div className='flex flex-wrap items-center -mx-3 lg:justify-between'>
              <div className='w-full max-w-full px-3 mt-0 mb-6 shrink-0 lg:mb-0 lg:w-1/2 lg:flex-none'>
                <div className='text-sm leading-normal text-center text-slate-500 lg:text-left'>
                  © made with <i className='fa fa-heart' /> by
                  <a
                    href='https://www.creative-tim.com'
                    className='font-semibold text-slate-700'
                    target='_blank'
                    rel='noreferrer'
                  >
                    Creative Tim
                  </a>
                  for a better web.
                </div>
              </div>
              <div className='w-full max-w-full px-3 mt-0 shrink-0 lg:w-1/2 lg:flex-none'>
                <ul className='flex flex-wrap justify-center pl-0 mb-0 list-none lg:justify-end'>
                  <li className='nav-item'>
                    <a
                      href='https://www.creative-tim.com'
                      className='block px-4 pt-0 pb-1 text-sm font-normal transition-colors ease-soft-in-out text-slate-500'
                      target='_blank'
                      rel='noreferrer'
                    >
                      Creative Tim
                    </a>
                  </li>
                  <li className='nav-item'>
                    <a
                      href='https://www.creative-tim.com/presentation'
                      className='block px-4 pt-0 pb-1 text-sm font-normal transition-colors ease-soft-in-out text-slate-500'
                      target='_blank'
                      rel='noreferrer'
                    >
                      About Us
                    </a>
                  </li>
                  <li className='nav-item'>
                    <a
                      href='https://creative-tim.com/blog'
                      className='block px-4 pt-0 pb-1 text-sm font-normal transition-colors ease-soft-in-out text-slate-500'
                      target='_blank'
                      rel='noreferrer'
                    >
                      Blog
                    </a>
                  </li>
                  <li className='nav-item'>
                    <a
                      href='https://www.creative-tim.com/license'
                      className='block px-4 pt-0 pb-1 pr-0 text-sm font-normal transition-colors ease-soft-in-out text-slate-500'
                      target='_blank'
                      rel='noreferrer'
                    >
                      License
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
