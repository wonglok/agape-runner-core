export function GuideNav() {
  return (
    <div className=' bg-gray-200'>
      <div className='container flex items-center justify-between mx-auto'>
        <div>
          <a
            className='block px-4 py-6 m-0 text-sm whitespace-nowrap text-slate-700'
            href='/agape'
          >
            <img
              src='../brand/agape.png'
              className='inline h-full max-w-full transition-all duration-200 ease-nav-brand max-h-8'
              alt='main_logo'
            />
          </a>
        </div>
        <div className='block py-6 m-0 text-sm px-7 whitespace-nowrap text-slate-700'></div>
      </div>
    </div>
  )
}
