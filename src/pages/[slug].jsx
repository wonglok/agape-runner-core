import { importNPM } from '@/components/servant/importPackages'
import { useRouter } from 'next/router'
// import { useEffect, useRef } from 'react'
import Script from 'next/script'
import { useEffect, useRef } from 'react'

export default function SlugPage() {
  let { query } = useRouter()

  let ref = useRef()
  useEffect(() => {
    if (typeof query.slug === 'undefined') {
      // load home page
    } else {
      // load other page
    }

    // console.log(query.slug)
    // window.React = React
    // window.ReactDOM = ReactDOM

    window.importNPM = importNPM
    // importNPM(['three']).then(([THREE]) => {
    //   console.log('MESH', THREE.Mesh)
    // })

    // import(/* webpackIgnore: true */ ).then((r) => {
    //   console.log(Object.keys(r))

    //   console.log(ref.current)
    // })

    // import '/static/react18/react-dom.production.min.js'
    // import '/static/react18/react.production.min.js' //
  }, [query.slug])

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
        src={'/static/react18/react-dom.production.min.js'}
      ></Script>
      <Script
        id='initloadd'
        src={'/api/js/fafa/yoyo2.js'}
        type='module'
      ></Script>
      {/*  */}

      {/*  */}
    </>
  )
}
