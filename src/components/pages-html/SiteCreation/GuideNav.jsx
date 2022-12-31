export function GuideNav() {
  return (
    <div className='flex items-center justify-between bg-gray-100'>
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
      <div className='block py-6 m-0 text-sm px-7 whitespace-nowrap text-slate-700'>
        {`Let's Create Your Metaverse Site`}
      </div>
    </div>
  )
}
