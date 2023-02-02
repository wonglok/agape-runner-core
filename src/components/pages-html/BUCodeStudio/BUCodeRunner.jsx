// import { UserEndPoints } from '@/aws/UserEndPoints'
// import { UserEndPoints } from '@/aws/UserEndPoints'
import { useEffect, useRef } from 'react'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
// import * as R3F from

export const DefaultSetting = {
  onFetch: ({ url, options }) => {
    return fetch(url, options)
  },
  onResolve: ({ id, parentUrl, resolve }) => {
    if (parentUrl.indexOf('blob:') === 0) {
      return resolve(id, '')
    }
    return resolve(id, parentUrl)
  },
}

export const getLoader = async ({
  onResolve = () => {},
  onFetch = () => {},
} = DefaultSetting) => {
  let res = document.body.querySelector('#importmap')

  if (!res) {
    document.body.appendChild(
      Object.assign(document.createElement('script'), {
        id: 'importmap',
        type: 'importmap-shim',
        innerHTML: JSON.stringify({
          imports: {},
        }),
      })
    )

    // document.body.appendChild(
    //   Object.assign(document.createElement('script'), {
    //     id: 'esms-options',
    //     innerHTML: JSON.stringify({
    //       shimMode: true,
    //     }),
    //   })
    // )
  }

  return new Promise(async (resolve) => {
    window.esmsInitOptions = {
      // Enable Shim Mode
      shimMode: true, // default false
      // Enable newer modules features
      polyfillEnable: ['css-modules', 'json-modules'], // default empty
      // Custom CSP nonce
      nonce: 'n0nce', // default is automatic detection
      // Don't retrigger load events on module scripts
      noLoadEventRetriggers: true, // default false
      // Skip source analysis of certain URLs for full native passthrough
      // skip: /^https:\/\/cdn\.com/, // defaults to null
      // Clean up blob URLs after execution
      revokeBlobURLs: true, // default false
      // Secure mode to not support loading modules without integrity (integrity is always verified though)
      enforceIntegrity: false, // default false
      // Permit overrides to import maps
      mapOverrides: true, // default false

      // -- Hooks --
      // Module load error
      onerror: (e) => {
        /*...*/
      }, // default noop
      // Called when polyfill mode first engages
      onpolyfill: () => {}, // default logs to the console
      // Hook all module resolutions
      resolve: (id, parentUrl, resolve) => {
        return onResolve({ id, parentUrl, resolve })
        // return resolve(id, parentUrl)
      }, // default is spec resolution
      // Hook source fetch function
      fetch: (url, options) => {
        //fetch(url, options)
        return onFetch({ url, options })
      }, // default is native
      // Hook import.meta construction
      meta: (meta, url) => {}, // default is noop
      // Hook top-level imports
      onimport: (url, options, parentUrl) => {
        // console.log('onimport', url, options, parentUrl)
      }, // default is noop
    }

    await import('es-module-shims')

    // let getEndPoint = () => UserEndPoints[process.env.NODE_ENV]
    // //
    // let getImportMap = async (myPackages) => {
    //   return fetch(`${getEndPoint()}/import-map`, {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       packages: myPackages,
    //     }),
    //     mode: 'cors',
    //   }).then((r) => {
    //     if (r.ok) {
    //       return r.json()
    //     } else {
    //       return Promise.reject()
    //     }
    //   })
    // }

    let tt = setInterval(() => {
      if (window.importShim) {
        clearInterval(tt)
        resolve({
          // addNPMs: (myPackages = ['three']) => {
          //   //
          //   return getImportMap(myPackages).then(async (r) => {
          //     await window.importShim.addImportMap(r)

          //     return Promise.all(
          //       myPackages.map((it) => {
          //         return window.importShim(it)
          //       })
          //     ).then((result) => {
          //       //
          //       console.log(result)
          //       //
          //       return result
          //     })
          //   })
          // },
          load: window.importShim,
          addImportMap: window.importShim.addImportMap,
        })
      }
    })
  })
}

//

//
let run = async ({ domElement, outputs, onClean }) => {
  window.React = React
  window.ReactDOM = ReactDOM
  window.getThree = () => import('three')
  window.getR3F = () => import('@react-three/fiber')
  window.getDrei = () => import('@react-three/drei')
  window.getPost = () => import('@react-three/postprocessing')
  window.getXR = () => import('@react-three/xr')
  window.getValtio = () => import('valtio')

  let loaderUtils = await getLoader()

  for (let output of outputs) {
    loaderUtils.addImportMap({
      imports: {
        [`${output.fileName}`]: URL.createObjectURL(
          new Blob([`${output.code}`], {
            type: `application/javascript`,
          })
        ),
      },
    })
  }

  // console.log(outputs)

  // loaderUtils.addImportMap({
  //   imports: {
  //     [`three`]: '/vendor/three-r149/build/three.module.js',
  //     [`three/examples/`]: '/vendor/three-r149/examples/',
  //   },
  // })

  loaderUtils.load('bundle-output.js').then((r) => {
    let runner = r.default
    if (typeof runner === 'function') {
      runner({ domElement, onClean, loader: loaderUtils })
    } else {
      console.log('cannot find default function for entry bundle-output.js')
    }

    // r.GUI.yo({
    //   domElement: domElement,
    //   onClean,
    //   // load3D: async () => {
    //   //   return {
    //   //     r3f: await import('@react-three/fiber'),
    //   //     post: await import('@react-three/postprocessing'),
    //   //     drei: await import('@react-three/drei'),
    //   //     three: await import('three'),
    //   //   }
    //   // },
    // })
  })
}

export function BUCodeRunner({ outputsJSON = false }) {
  let ref = useRef()

  useEffect(() => {
    /// inputGUI
    // console.log('!!!!')

    //
    let id = ''

    let params = new URLSearchParams(window.location.search)
    id = params.get('id') || ''

    const bc = new BroadcastChannel('editor' + id)

    bc.postMessage({
      action: 'compile',
    })

    let cleans = []

    let onClean = (v) => {
      cleans.push(v)
    }

    bc.onmessage = (event) => {
      let outputs = event.data.outputs
      if (outputs) {
        cleans.forEach((v) => v())
        cleans = []
        run({ domElement: ref.current, outputs: outputs, onClean })
      }
    }

    if (outputsJSON) {
      run({ domElement: ref.current, outputs: outputsJSON, onClean })
    }

    return () => {
      cleans.forEach((v) => v())
      cleans = []

      bc.close()
    }
  }, [outputsJSON])
  //
  return (
    <div className='w-full h-full' ref={ref}>
      <Triangle></Triangle>
    </div>
  )
}

function Triangle() {
  return (
    <div
      className='absolute top-0 left-0 flex items-center justify-center w-full h-full bg-white bg-opacity-30 backdrop-blur-md'
      style={{ zIndex: '1000' }}
    >
      <div className='loader-triangle-7'>
        <svg width='56px' height='50px' viewBox='0 0 226 200' version='1.1'>
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
              stroke={'black'}
              // stroke='url(#linearGradient-1)'
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
  )
}
