import '@/styles/index.css'

import { useEffect, useRef, useState } from 'react'
import { hydration } from '@/auth/GateMethods'
import TitleHeader from '@/config'
import { ConfirmProvider } from 'material-ui-confirm'

function App({ Component, pageProps = { title: 'index' } }) {
  let ref = useRef(false)
  useEffect(() => {
    if (!ref.current) {
      ref.current = true
      hydration()
    }
  }, [])

  return (
    <>
      <ConfirmProvider>
        {pageProps.title && <TitleHeader title={pageProps.title} />}

        {<Component {...pageProps}></Component>}
      </ConfirmProvider>

      <span
        style={{
          display: 'block',
          position: 'absolute',
          zIndex: 10,
        }}
        id='myroot'
      ></span>
    </>
  )
}

export default App

// let a = (
//   <div
//     className='absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-30 backdrop-blur-md'
//     style={{ zIndex: '1000' }}
//   >
//     <div className='loader-triangle-7'>
//       <svg width='56px' height='50px' viewBox='0 0 226 200' version='1.1'>
//         <g
//           id='Page-1'
//           stroke='none'
//           strokeWidth='2'
//           fill='none'
//           fillRule='evenodd'
//         >
//           <g
//             id='Artboard'
//             fillRule='nonzero'
//             stroke={'black'}
//             // stroke='url(#linearGradient-1)'
//             strokeWidth='10'
//           >
//             <g id='white-bg-logo'>
//               <path
//                 d='M113,5.08219117 L4.28393801,197.5 L221.716062,197.5 L113,5.08219117 Z'
//                 id='Triangle-3-Copy'
//               ></path>
//             </g>
//           </g>
//         </g>
//       </svg>
//     </div>
//   </div>
// )
