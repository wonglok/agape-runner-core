const { default: Link } = require('next/link')

export function OneLink({ item }) {
  let getActiveClass = (className, url) => {
    if (location) {
      return location.pathname === url ? className : ''
    }
  }

  return (
    <li key={item.oid} className='w-full mt-0.5'>
      <Link href={item.link}>
        <div
          className={
            'flex items-center px-4 mx-4 my-0 text-sm cursor-pointer hover:underline underline-offset-4 py-2.7 ease-nav-brand whitespace-nowrap transition-colors '
          }
        >
          <svg
            width='24'
            height='24'
            xmlns='http://www.w3.org/2000/svg'
            fillRule='evenodd'
            clipRule='evenodd'
            className={
              'rounded-full  fill-slate-800 ' +
              getActiveClass('  shadow-lg shadow-cyan-200', item.link)
            }
          >
            <path d='M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm-3 5.753l6.44 5.247-6.44 5.263.678.737 7.322-6-7.335-6-.665.753z' />
          </svg>
          <span
            className={
              'ml-1 opacity-100 pointer-events-none duration-300 ease-soft ' +
              getActiveClass('text-cyan-600 underline ', item.link) +
              getActiveClass('  shadow-lg shadow-cyan-200', item.link)
            }
          >
            {item.name}
          </span>
        </div>
      </Link>
    </li>
  )
}
