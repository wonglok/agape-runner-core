;<nav className='top-0 z-50 flex flex-wrap items-center justify-between w-full bg-black shadow-lg lg:fixed lg:bg-opacity-50'>
  <div className='flex flex-col items-center justify-center w-full py-4 text-sm text-white bg-black lg:flex-row'>
    <div className='mr-3'>AGAPE ENGINE ALPHA PASS</div>
    <a href='/'>
      <img
        src={`/site/navbar/alpha-pass.svg`}
        className={'h-8 mt-3 lg:mt-0'}
        alt={'effectnode-alpha-pass'}
      />
    </a>
  </div>

  <div className='container flex flex-wrap items-center justify-center px-4 mx-auto bg-black lg:bg-transparent  '>
    <div className='relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start'>
      <a
        className='py-2 mr-4 text-sm font-bold leading-relaxed uppercase lg:inline-block whitespace-nowrap text-slate-200'
        href='/learning-lab/tailwind-starter-kit/presentation'
      >
        Agape Effect Node 3D Engine
      </a>
      {/* <button
                className='block px-3 py-1 text-xl leading-none bg-transparent border border-transparent border-solid rounded outline-none cursor-pointer lg:hidden focus:outline-none'
                type='button'
              >
                <i className='fas fa-bars'></i>
              </button> */}
    </div>

    <div
      className='items-center flex-grow hidden lg:flex'
      id='example-navbar-danger'
    >
      <ul className='flex flex-col list-none lg:flex-row lg:ml-auto'>
        <li className='nav-item'>
          <a
            href='https://www.facebook.com/sharer/sharer.php?u=https://www.creative-tim.com/learning-lab/tailwind-starter-kit#/presentation'
            className='flex items-center px-3 py-2 text-xs font-bold uppercase text-slate-200 hover:text-slate-500'
            target='_blank'
            rel='noreferrer'
          ></a>
        </li>
        <li className='nav-item'>
          <a
            href='https://www.facebook.com/sharer/sharer.php?u=https://www.creative-tim.com/learning-lab/tailwind-starter-kit#/presentation'
            className='flex items-center px-3 py-2 text-xs font-bold uppercase text-slate-200 hover:text-slate-500'
            target='_blank'
            rel='noreferrer'
          >
            <i className='text-lg fab fa-facebook-square leading-lg text-slate-400'></i>
            <span className='ml-2'>Share</span>
          </a>
        </li>
        <li className='nav-item'>
          <a
            href='https://twitter.com/intent/tweet?text=Check%20Tailwind%20Starter%20Kit%2C%20a%20beautiful%20extension%20of%20%23TailwindCSS%20made%20by%20%40CreativeTim%20%23webdesign%20%23starterkit&amp;url=https%3A%2F%2Fwww.creative-tim.com%2Flearning-lab%2Ftailwind-starter-kit%23%2Fpresentation'
            className='flex items-center px-3 py-2 text-xs font-bold uppercase text-slate-200 hover:text-slate-500'
            target='_blank'
            rel='noreferrer'
          >
            <i className='text-lg fab fa-twitter leading-lg text-slate-400'></i>
            <span className='ml-2'>Tweet</span>
          </a>
        </li>
        <li className='nav-item'>
          <a
            className='flex items-center px-3 py-2 text-xs font-bold uppercase text-slate-200 hover:text-slate-500'
            href='/learning-lab/tailwind-starter-kit/documentation/quick-start'
          >
            <i className='text-lg far fa-file-alt leading-lg text-slate-400'></i>
            <span className='ml-2'>Docs</span>
          </a>
        </li>
        <li className='nav-item'>
          <a
            className='flex items-center px-3 py-2 text-xs font-bold uppercase download-button text-slate-200 hover:text-slate-500'
            href='/learning-lab/tailwind-starter-kit/documentation/download'
          >
            <i className='text-lg fas fa-arrow-alt-circle-down leading-lg text-slate-400'></i>
            <span className='ml-2'>Download</span>
          </a>
        </li>
        <li className='nav-item'>
          <a
            href='https://github.com/creativetimofficial/tailwind-starter-kit/archive/designer-files.zip?ref=tsk-navbar'
            className='flex items-center px-3 py-2 text-xs font-bold uppercase download-button text-slate-200 hover:text-slate-500'
          >
            <i className='text-lg fab fa-sketch leading-lg text-slate-400'></i>
            <span className='ml-2'>Download Designer</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>
