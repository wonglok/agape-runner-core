import '@/styles/index.css'

import { useRouter } from 'next/router'
import { Suspense, useEffect } from 'react'
import Header from '@/config'
import { Multiverse } from '@/components/layout/Multiverse'
import { useSystemStore } from '@/helpers/useSystemStore'
import { PromotePage } from '@/components/layout/PromotePage'
import { Loader } from '@react-three/drei'
import { ToastContainer } from 'react-toastify'
import { LandingPage } from '@/components/layout/LandingPage'
import { useReady } from '@/helpers/useScrollStore'

function App({ Component, pageProps = { title: 'index' } }) {
  const router = useRouter()
  const setRouter = useSystemStore((s) => s.setRouter)

  useEffect(() => {
    setRouter({ router })
  }, [router, setRouter])

  let loading = useReady((s) => s.loading)
  let setLoading = useReady((s) => s.setLoading)

  useEffect(() => {
    // if (Component.layout === 'Multiverse') {
    //   setLoading(true)
    // }

    // if (Component.layout === 'PromotePage') {
    //   setLoading(true)
    // }

    if (Component.layout === 'Landing') {
      setLoading(true)
    }
  }, [])

  //
  return (
    <>
      <Header title={pageProps.title} />

      {router && (
        <>
          {Component.layout === 'Multiverse' && (
            <>
              <Multiverse router={router} {...pageProps}>
                <Component router={router} {...pageProps}></Component>
              </Multiverse>
              <Loader />
            </>
          )}

          {Component.layout === 'PromotePage' && (
            <PromotePage router={router} {...pageProps}>
              <Component router={router} {...pageProps}></Component>
            </PromotePage>
          )}

          {Component.layout === 'Landing' && (
            <LandingPage router={router} {...pageProps}>
              <Component router={router} {...pageProps}></Component>
            </LandingPage>
          )}

          {typeof Component.layout === 'undefined' && (
            <Component router={router} {...pageProps}></Component>
          )}

          {typeof Component.SEO !== 'undefined' && (
            <Component.SEO router={router} {...pageProps}></Component.SEO>
          )}

          <span
            style={{
              display: 'block',
              position: 'absolute',
              zIndex: 10,
            }}
            id='myroot'
          ></span>

          <ToastContainer
            position='top-right'
            zIndex={1000}
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </>
      )}

      {loading && (
        <div
          className='absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-30 backdrop-blur-md'
          style={{ zIndex: '1000' }}
        >
          <div className='loader-triangle-7'>
            <svg width='56px' height='50px' viewBox='0 0 226 200' version='1.1'>
              <defs>
                <linearGradient
                  x1='114.720775%'
                  y1='181.283245%'
                  x2='39.5399306%'
                  y2='100%'
                  id='linearGradient-1'
                >
                  <stop stopColor='#fff' offset='0%'></stop>
                  <stop stopColor='#bbb' offset='100%'></stop>
                </linearGradient>
              </defs>
              <g
                id='Page-1'
                stroke='none'
                strokeWidth='2'
                fill='none'
                fillRule='evenodd'
              >
                <g
                  id='Artboard'
                  fillRule='nonzero'
                  stroke='url(#linearGradient-1)'
                  strokeWidth='10'
                >
                  <g id='white-bg-logo'>
                    <path
                      d='M113,5.08219117 L4.28393801,197.5 L221.716062,197.5 L113,5.08219117 Z'
                      id='Triangle-3-Copy'
                    ></path>
                  </g>
                </g>
              </g>
            </svg>
          </div>
        </div>
      )}
    </>
  )
}

export default App
