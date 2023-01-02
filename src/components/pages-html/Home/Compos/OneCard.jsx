import Link from 'next/link'

export function OneCard({ site }) {
  return (
    <div className='w-full max-w-full px-3 mb-6 md:w-6/12 md:flex-none xl:mb-6 xl:w-3/12'>
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
          <a data-stuff='javascript:;'>
            <h5>{site.slug}</h5>
          </a>
          {/*  */}
          <p className='flex mb-6 text-sm leading-normal'>
            https://{site.slug}.at.agape.town
          </p>
          <div className='flex items-center justify-start'>
            <Link href={`https://${site.slug}.at.agape.town`}>
              <button
                type='button'
                className='inline-flex items-center px-4 py-2 mb-0 mr-3 text-xs font-bold text-center uppercase align-middle bg-transparent border border-solid rounded-lg shadow-none cursor-pointer transition-all leading-pro ease-soft-in hover:scale-102 active:shadow-soft-xs tracking-tight-soft border-fuchsia-500 text-fuchsia-500 hover:border-fuchsia-500 hover:bg-transparent hover:text-fuchsia-500 hover:opacity-75 hover:shadow-none active:bg-fuchsia-500 active:text-white active:hover:bg-transparent active:hover:text-fuchsia-500'
              >
                Visit
                <div className='inline-block ml-2 scale-75'>
                  <svg
                    width='24'
                    height='24'
                    xmlns='http://www.w3.org/2000/svg'
                    fillRule='evenodd'
                    clipRule='evenodd'
                    fill={`rgb(203 12 159)`}
                  >
                    <path d='M14 4h-13v18h20v-11h1v12h-22v-20h14v1zm10 5h-1v-6.293l-11.646 11.647-.708-.708 11.647-11.646h-6.293v-1h8v8z' />
                  </svg>
                </div>
              </button>
            </Link>
            {/*  */}
            {/*  */}
            <Link href={`/creator-portal/sites/${site.oid}/edit`}>
              <button
                type='button'
                className='inline-flex items-center px-4 py-2 mb-0 mr-3 text-xs font-bold text-center uppercase align-middle bg-transparent border border-solid rounded-lg shadow-none cursor-pointer transition-all leading-pro ease-soft-in hover:scale-102 active:shadow-soft-xs tracking-tight-soft border-fuchsia-500 text-fuchsia-500 hover:border-fuchsia-500 hover:bg-transparent hover:text-fuchsia-500 hover:opacity-75 hover:shadow-none active:bg-fuchsia-500 active:text-white active:hover:bg-transparent active:hover:text-fuchsia-500'
              >
                Edit
                {/*  */}
                <div className='inline-block ml-2 scale-75'>
                  <svg
                    width='24'
                    height='24'
                    xmlns='http://www.w3.org/2000/svg'
                    fillRule='evenodd'
                    clipRule='evenodd'
                    fill={`rgb(203 12 159)`}
                  >
                    <path d='M12 8.666c-1.838 0-3.333 1.496-3.333 3.334s1.495 3.333 3.333 3.333 3.333-1.495 3.333-3.333-1.495-3.334-3.333-3.334m0 7.667c-2.39 0-4.333-1.943-4.333-4.333s1.943-4.334 4.333-4.334 4.333 1.944 4.333 4.334c0 2.39-1.943 4.333-4.333 4.333m-1.193 6.667h2.386c.379-1.104.668-2.451 2.107-3.05 1.496-.617 2.666.196 3.635.672l1.686-1.688c-.508-1.047-1.266-2.199-.669-3.641.567-1.369 1.739-1.663 3.048-2.099v-2.388c-1.235-.421-2.471-.708-3.047-2.098-.572-1.38.057-2.395.669-3.643l-1.687-1.686c-1.117.547-2.221 1.257-3.642.668-1.374-.571-1.656-1.734-2.1-3.047h-2.386c-.424 1.231-.704 2.468-2.099 3.046-.365.153-.718.226-1.077.226-.843 0-1.539-.392-2.566-.893l-1.687 1.686c.574 1.175 1.251 2.237.669 3.643-.571 1.375-1.734 1.654-3.047 2.098v2.388c1.226.418 2.468.705 3.047 2.098.581 1.403-.075 2.432-.669 3.643l1.687 1.687c1.45-.725 2.355-1.204 3.642-.669 1.378.572 1.655 1.738 2.1 3.047m3.094 1h-3.803c-.681-1.918-.785-2.713-1.773-3.123-1.005-.419-1.731.132-3.466.952l-2.689-2.689c.873-1.837 1.367-2.465.953-3.465-.412-.991-1.192-1.087-3.123-1.773v-3.804c1.906-.678 2.712-.782 3.123-1.773.411-.991-.071-1.613-.953-3.466l2.689-2.688c1.741.828 2.466 1.365 3.465.953.992-.412 1.082-1.185 1.775-3.124h3.802c.682 1.918.788 2.714 1.774 3.123 1.001.416 1.709-.119 3.467-.952l2.687 2.688c-.878 1.847-1.361 2.477-.952 3.465.411.992 1.192 1.087 3.123 1.774v3.805c-1.906.677-2.713.782-3.124 1.773-.403.975.044 1.561.954 3.464l-2.688 2.689c-1.728-.82-2.467-1.37-3.456-.955-.988.41-1.08 1.146-1.785 3.126' />
                  </svg>
                </div>
              </button>
            </Link>

            {false && (
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
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
