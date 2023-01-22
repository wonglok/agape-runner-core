import { useEffect, useRef } from 'react'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
export const getLoader = async ({
  onResolve = () => {},
  onFetch = () => {},
}) => {
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
    //
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
      skip: /^https:\/\/cdn\.com/, // defaults to null
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
        console.log('onimport', url, options, parentUrl)
      }, // default is noop
    }

    await import('es-module-shims')

    //
    // myPackages.map((it) => {
    //  return window.importShim(it)
    // })
    //
    //window.importShim.addImportMap(v)

    let tt = setInterval(() => {
      if (window.importShim) {
        clearInterval(tt)
        resolve({
          load: window.importShim,
          addImportMap: window.importShim.addImportMap,
        })
      }
    })
  })
}

//
let run = async ({ domElement, outputs, onClean }) => {
  window.React = React
  window.ReactDOM = ReactDOM

  let loaderUtils = await getLoader({
    onFetch: ({ url, options }) => {
      return fetch(url, options)
    },
    onResolve: ({ id, parentUrl, resolve }) => {
      console.log('onResolve', id, parentUrl)

      if (parentUrl.indexOf('blob:') === 0) {
        return resolve(id, '')
      }
      return resolve(id, parentUrl)
    },
  })

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

  loaderUtils.load('index.js').then((r) => {
    r.GUI.yo({ domElement: domElement, onClean })
  })
}

export default function Run() {
  let ref = useRef()

  useEffect(() => {
    ref.current.innerHTML = 'ready...'

    const bc = new BroadcastChannel('webgl_channel_' + 'aabbcc123412321321')

    let cleans = []
    let onClean = (v) => {
      cleans.push(v)
    }
    bc.onmessage = (event) => {
      let outputs = event.data.outputs
      run({ domElement: ref.current, outputs: outputs, onClean })
    }

    return () => {
      bc.close()
      cleans.forEach((v) => v())
    }
  }, [])
  return <div ref={ref}></div>
}
