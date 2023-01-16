// import {
//   DynamicPage,
//   getServerSidePropsForDynamicPage,
// } from '@/helpers/DynamicPage'

// export const getServerSideProps = getServerSidePropsForDynamicPage({
//   isIndex: true,
// })

// export default DynamicPage

import { importNPM } from '@/components/servant/importPackages'
import { useRouter } from 'next/router'
// import { useEffect, useRef } from 'react'
import Script from 'next/script'
import { useEffect, useRef } from 'react'

export default function SlugPage() {
  let { query } = useRouter()

  let ref = useRef()
  useEffect(() => {
    if (query) {
      if (typeof query.slug === 'undefined') {
        // load home page
      } else {
        // load other page
      }
    }

    // console.log(query.slug)
    // window.React = React
    // window.ReactDOM = ReactDOM

    //

    window.importNPM = importNPM

    let url = `/api/js/projectIDAAAAAAAAAA/package-yoyo/module-fafa/main.js`

    import(/* webpackIgnore: true */ url).then(({ init }) => {
      init({
        domElement: ref.current,
      })
    })

    // importNPM(['three']).then(([THREE]) => {
    //   console.log('MESH', THREE.Mesh)
    // })

    // import(/* webpackIgnore: true */ ).then((r) => {
    //   console.log(Object.keys(r))

    //   console.log(ref.current)
    // })
  }, [query, query.slug])

  //
  return (
    <>
      <div className='w-full h-full' ref={ref}>
        <LoaderDiv></LoaderDiv>
      </div>

      {/*
      <Script
        id='react'
        src={'/static/react18/react.production.min.js'}
      ></Script>
      <Script
        id='react-dom'
        src={'/static/react18/react-dom.prod.min.js'}
      ></Script> */}
      {/*  */}
    </>
  )
}

function LoaderDiv() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: /* css */ `
      .loaderBody {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.loaderBody {
  display: flex;
  justify-content: center;
  align-items: center;
}

svg {
  display: none;
}

.blobs {
  filter: url(#goo);
  width: 300px;
  height: 300px;
  position: relative;
  overflow: hidden;
  border-radius: 70px;
  transform-style: preserve-3d;
}

.blobs .blob-center {
  transform-style: preserve-3d;
  position: absolute;
  background: #bababa;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 30px;
  transform-origin: left top;
  transform: scale(0.9) translate(-50%, -50%);
  -webkit-animation: blob-grow linear 3.4s infinite;
          animation: blob-grow linear 3.4s infinite;
  border-radius: 50%;
  box-shadow: 0 -10px 40px -5px #bababa;
}

.blob {
  position: absolute;
  background: #bababa;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  -webkit-animation: blobs ease-out 3.4s infinite;
          animation: blobs ease-out 3.4s infinite;
  transform: scale(0.9) translate(-50%, -50%);
  transform-origin: center top;
  opacity: 0;
}
.blob:nth-child(1) {
  -webkit-animation-delay: 0.2s;
          animation-delay: 0.2s;
}
.blob:nth-child(2) {
  -webkit-animation-delay: 0.4s;
          animation-delay: 0.4s;
}
.blob:nth-child(3) {
  -webkit-animation-delay: 0.6s;
          animation-delay: 0.6s;
}
.blob:nth-child(4) {
  -webkit-animation-delay: 0.8s;
          animation-delay: 0.8s;
}
.blob:nth-child(5) {
  -webkit-animation-delay: 1s;
          animation-delay: 1s;
}

@-webkit-keyframes blobs {
  0% {
    opacity: 0;
    transform: scale(0) translate(calc(-330px - 50%), -50%);
  }
  1% {
    opacity: 1;
  }
  35%, 65% {
    opacity: 1;
    transform: scale(0.9) translate(-50%, -50%);
  }
  99% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: scale(0) translate(calc(330px - 50%), -50%);
  }
}

@keyframes blobs {
  0% {
    opacity: 0;
    transform: scale(0) translate(calc(-330px - 50%), -50%);
  }
  1% {
    opacity: 1;
  }
  35%, 65% {
    opacity: 1;
    transform: scale(0.9) translate(-50%, -50%);
  }
  99% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: scale(0) translate(calc(330px - 50%), -50%);
  }
}
@-webkit-keyframes blob-grow {
  0%, 39% {
    transform: scale(0) translate(-50%, -50%);
  }
  40%, 42% {
    transform: scale(1, 0.9) translate(-50%, -50%);
  }
  43%, 44% {
    transform: scale(1.2, 1.1) translate(-50%, -50%);
  }
  45%, 46% {
    transform: scale(1.3, 1.2) translate(-50%, -50%);
  }
  47%, 48% {
    transform: scale(1.4, 1.3) translate(-50%, -50%);
  }
  52% {
    transform: scale(1.5, 1.4) translate(-50%, -50%);
  }
  54% {
    transform: scale(1.7, 1.6) translate(-50%, -50%);
  }
  58% {
    transform: scale(1.8, 1.7) translate(-50%, -50%);
  }
  68%, 70% {
    transform: scale(1.7, 1.5) translate(-50%, -50%);
  }
  78% {
    transform: scale(1.6, 1.4) translate(-50%, -50%);
  }
  80%, 81% {
    transform: scale(1.5, 1.4) translate(-50%, -50%);
  }
  82%, 83% {
    transform: scale(1.4, 1.3) translate(-50%, -50%);
  }
  84%, 85% {
    transform: scale(1.3, 1.2) translate(-50%, -50%);
  }
  86%, 87% {
    transform: scale(1.2, 1.1) translate(-50%, -50%);
  }
  90%, 91% {
    transform: scale(1, 0.9) translate(-50%, -50%);
  }
  92%, 100% {
    transform: scale(0) translate(-50%, -50%);
  }
}
@keyframes blob-grow {
  0%, 39% {
    transform: scale(0) translate(-50%, -50%);
  }
  40%, 42% {
    transform: scale(1, 0.9) translate(-50%, -50%);
  }
  43%, 44% {
    transform: scale(1.2, 1.1) translate(-50%, -50%);
  }
  45%, 46% {
    transform: scale(1.3, 1.2) translate(-50%, -50%);
  }
  47%, 48% {
    transform: scale(1.4, 1.3) translate(-50%, -50%);
  }
  52% {
    transform: scale(1.5, 1.4) translate(-50%, -50%);
  }
  54% {
    transform: scale(1.7, 1.6) translate(-50%, -50%);
  }
  58% {
    transform: scale(1.8, 1.7) translate(-50%, -50%);
  }
  68%, 70% {
    transform: scale(1.7, 1.5) translate(-50%, -50%);
  }
  78% {
    transform: scale(1.6, 1.4) translate(-50%, -50%);
  }
  80%, 81% {
    transform: scale(1.5, 1.4) translate(-50%, -50%);
  }
  82%, 83% {
    transform: scale(1.4, 1.3) translate(-50%, -50%);
  }
  84%, 85% {
    transform: scale(1.3, 1.2) translate(-50%, -50%);
  }
  86%, 87% {
    transform: scale(1.2, 1.1) translate(-50%, -50%);
  }
  90%, 91% {
    transform: scale(1, 0.9) translate(-50%, -50%);
  }
  92%, 100% {
    transform: scale(0) translate(-50%, -50%);
  }
}

      `,
        }}
      ></style>
      <div className='loaderBody'>
        <div className=''>
          <div className='flex items-center justify-center'>
            Loading Metaverse...
          </div>
          <div className='blobs'>
            <div className='blob-center'></div>
            <div className='blob'></div>
            <div className='blob'></div>
            <div className='blob'></div>
            <div className='blob'></div>
            <div className='blob'></div>
            <div className='blob'></div>
          </div>
          <svg
            className='hidden'
            xmlns='http://www.w3.org/2000/svg'
            version='1.1'
          >
            <defs>
              <filter id='goo'>
                <feGaussianBlur
                  in='SourceGraphic'
                  stdDeviation='10'
                  result='blur'
                />
                <feColorMatrix
                  in='blur'
                  mode='matrix'
                  values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7'
                  result='goo'
                />
                <feBlend in='SourceGraphic' in2='goo' />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </>
  )
}
