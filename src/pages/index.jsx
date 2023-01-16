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

    window.importNPM = importNPM

    let url = `/api/js/projectIDAAAAAAAAAA/package-yoyo/module-fafa/main.js`
    import(/* webpackIgnore: true */ url).then(({ init }) => {
      init({ domElement: ref.current })
    })

    // importNPM(['three']).then(([THREE]) => {
    //   console.log('MESH', THREE.Mesh)
    // })

    // import(/* webpackIgnore: true */ ).then((r) => {
    //   console.log(Object.keys(r))

    //   console.log(ref.current)
    // })
  }, [query?.slug])

  //
  return (
    <>
      <div className='w-full h-full' ref={ref}></div>

      <Script
        id='react'
        src={'/static/react18/react.production.min.js'}
      ></Script>
      <Script
        id='react-dom'
        src={'/static/react18/react-dom.prod.min.js'}
      ></Script>
      {/*  */}

      {/*  */}
    </>
  )
}
