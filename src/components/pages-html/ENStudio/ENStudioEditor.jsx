/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { GateState } from '@/auth/GateState.ts'
import { ref, useSnapshot } from 'valtio'
import { useRouter } from 'next/router'
import { rollup } from 'rollup'
import { useEffect, useRef } from 'react'
import path from 'path'
import initSwc, { transform } from '@swc/wasm-web'
// const uglify = require('uglifyjs-browser')
import * as React from 'react'

async function compile({ input }) {
  const result = await transform(input, {
    jsc: {
      parser: {
        syntax: 'ecmascript',
        jsx: true,
        dynamicImport: true,
        privateMethod: true,
        functionBind: true,
        exportDefaultFrom: false,
        exportNamespaceFrom: false,
        decorators: false,
        decoratorsBeforeExport: true,
        topLevelAwait: true,
        importMeta: true,
        preserveAllComments: false,
      },

      //
      transform: {
        react: {
          pragma: 'window.React.createElement',
        },
      },

      // minify: {},
      //
      target: 'es2018',
      loose: false,
      externalHelpers: false,
      keepClassNames: true,
    },

    isModule: true,

    module: {
      type: 'es6',
    },
  })

  return result.code
}

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

let onRun = async ({ domElement }) => {
  const myModules = [
    {
      moduleName: 'main',
      files: [
        {
          fileName: `index.js`,
          content: /* js */ `
            import b from './b.js';

            import('./codesplit.js').then((r) => {
              console.log(r.default);

              function Yo () {
                return null
              }
              console.log(<Yo></Yo>)
            })
            import('network:/manifest.json').then(v=>{
              console.log(v)
            })

            export const GUI = {
              yoyo: 1234,
              yo: ({ domElement }) => {
                domElement.innerText = Math.random()
              }
            }

            console.log('GUI')

            import('../engine/index.js').then((r)=>{
              console.log(r.default)
            })
            import('./json.json').then((r)=>{
              console.log(r.default)
            })

            export default {
              mod: 'main',
              a:b
            };
          `,
        },
        {
          fileName: `b.js`,
          content: /* js */ `
            export default {
              b:'bbbbbb'
            }
          `,
        },
        {
          fileName: `json.json`,
          content: JSON.stringify({ yo: 1234 }),
        },
        {
          fileName: `codesplit.js`,
          content: /* js */ `
            export default {
              yaya:'yayayayayayayaya'
            }
          `,
        },
      ],
    },

    {
      moduleName: 'engine',
      files: [
        {
          fileName: `index.js`,
          content: /* js */ `
            import b from './b.js';

            import('./codesplit.js').then((r) => {
              console.log(r.default)
            })

            export const GUI = {
              yoyo: 1234
            }

            console.log('GUI', GUI)

            export default {
              mod: 'engine',
              a:b
            };
          `,
        },
        {
          fileName: `b.js`,
          content: /* js */ `
            export default {
              b:'bbbbbb'
            }
          `,
        },
        {
          fileName: `codesplit.js`,
          content: /* js */ `


            export default {
              yaya:'yayayayayayayaya'
            }
          `,
        },
      ],
    },
  ]

  const rollupLocalhost = `rollup://localhost/`

  const getFileName = ({ mod, fileName }) => {
    let file = mod.files.find((e) => e.fileName === fileName)
    return `${rollupLocalhost}${mod.moduleName}/${file.fileName}`
  }

  // let getContent = ({ moduleName, fileName }) => {
  //   let mod = myModules.find((e) => e.moduleName === moduleName)
  //   if (!mod) {
  //     return `console.log('not found module', ${JSON.stringify({
  //       moduleName,
  //     })})`
  //   }
  //   let file = (mod?.files || []).find((e) => e.fileName === fileName)
  //   if (!file) {
  //     return `console.log('not found code', ${JSON.stringify({
  //       fileName,
  //       moduleName,
  //     })})`
  //   }
  //   return file.content
  // }

  //

  let fileList = []

  for (let mod of myModules) {
    for (let file of mod.files) {
      fileList.push({
        rollup: `${rollupLocalhost}${mod.moduleName}/${file.fileName}`,
        content: file.content,
      })
    }
  }

  await initSwc()

  let bundle = rollup({
    input: getFileName({
      mod: myModules[0],
      fileName: 'index.js',
    }),
    plugins: [
      {
        name: 'rollup-in-browser-example',
        resolveId(importee, importer) {
          if (!importer) {
            return importee
          }
          return new URL(importee, importer).href
        },

        //
        async load(id) {
          if (id.indexOf('network:') === 0) {
            let url = id.replace('network:', '').replace(rollupLocalhost, '')

            return fetch(url)
              .then((r) => r.text())
              .then((t) => {
                return `export default ${JSON.stringify(t)}`
              })
          }

          let file = fileList.find((e) => e.rollup === id)

          if (path.parse(file.rollup)?.ext === '.json') {
            return `export default ${file.content}`
          }

          if (file?.content) {
            return await compile({ input: file.content || '' })

            // return file.content
          }

          return `console.log('not-found',${JSON.stringify(id)})`
        },
      },
    ],
  })

  let outputs = (await (await bundle).generate({})).output

  console.log(
    outputs.map((e) => {
      return {
        fileName: e.fileName,
        code: e.code,
      }
    })
  )

  //
  // console.log(outputs)
  //

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

  //

  // await initSwc()
  // await Promise.all(
  //   outputs.map(async (output) => {
  //     //

  //     console.log(output)

  //     output.code = await minify(output.code)

  //     return output
  //   })
  // )

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

  // //
  // // outputs.forEach((item) => {

  loaderUtils.load('index.js').then((r) => {
    console.log(r.GUI.yo({ domElement: domElement }))
    //
  })
  //

  // fetch(`${UserEndPoints[process.env.NODE_ENV]}/bundle`, {
  //   method: 'GET',
  //   mode: 'cors',
  //   // body: JSON.stringify({}),
  // }).then(
  //   (res) => {
  //     res.json()
  //   },
  //   (err) => {
  //     console.log(err)
  //   }
  // )
  //
}

export function ENStudioEditor({ content }) {
  //
  let gs = useSnapshot(GateState)

  let ref = useRef()
  //
  let {
    query: { folderID },
  } = useRouter()

  useEffect(() => {
    window.React = React

    window.addEventListener('message', (ev) => {
      //
      console.log(ev.data)
    })

    onRun({ domElement: ref.current })
  }, [])

  //
  return (
    <>
      <button
        onClick={(ev) => {
          onRun({ domElement: ref.current })
        }}
        className='inline-block w-20 h-20 mr-3 text-xs bg-white border-2 border-gray-400 shadow-xl rounded-2xl'
      >
        3D Asset
      </button>
      <div ref={ref}>1111</div>
    </>
  )
}

//

//

//

function LoaderGrid() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: /* css */ `


ul.dotscontian {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: rotate(45deg) translate(-50%, -50%) scale(0.5);
}

.dotscontian li {
  list-style-type: none;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 20px;
  height: 20px;
  background: #444444;
  border-radius: 50%;
  box-shadow: 0px 0px 30px 0px #444444;
}

#a {
  animation: a 1s ease-in-out infinite;
  top: -40px;
  left: -40px;
}

#b {
  animation: b 1s ease-in-out infinite;
  top: -40px;
  left: 0px;
}

#c {
  animation: c 1s ease-in-out infinite;
  top: -40px;
  left: 40px;
}

#d {
  animation: d 1s ease-in-out infinite;
  top: 0px;
  left: -40px;
}

#e {
  animation: e 1s ease-in-out infinite;
  top: 0px;
  left: 0px;
}

#f {
  animation: f 1s ease-in-out infinite;
  top: 0px;
  left: 40px;
}

#g {
  animation: g 1s ease-in-out infinite;
  top: 40px;
  left: -40px;
}

#h {
  animation: h 1s ease-in-out infinite;
  top: 40px;
  left: 0px;
}

#i {
  animation: i 1s ease-in-out infinite;
  top: 40px;
  left: 40px;
}

@keyframes a {
  50% {
    top: 0px;
    left: -40px;
  }
  100% {
    top: 0px;
    left: -40px;
  }
}
@keyframes b {
  50% {
    top: -40px;
    left: -40px;
  }
  100% {
    top: -40px;
    left: -40px;
  }
}
@keyframes c {
  50% {
    top: -40px;
    left: 0px;
  }
  100% {
    top: -40px;
    left: 0px;
  }
}
@keyframes d {
  50% {
    top: 40px;
    left: -40px;
  }
  100% {
    top: 40px;
    left: -40px;
  }
}
@keyframes f {
  50% {
    top: -40px;
    left: 40px;
  }
  100% {
    top: -40px;
    left: 40px;
  }
}
@keyframes g {
  50% {
    top: 40px;
    left: 0px;
  }
  100% {
    top: 40px;
    left: 0px;
  }
}
@keyframes h {
  50% {
    top: 40px;
    left: 40px;
  }
  100% {
    top: 40px;
    left: 40px;
  }
}
@keyframes i {
  50% {
    top: 0px;
    left: 40px;
  }
  100% {
    top: 0px;
    left: 40px;
  }
}
    `,
        }}
      ></style>
      <ul className='dotscontian'>
        <li className='' id='a'></li>
        <li className='' id='b'></li>
        <li className='' id='c'></li>
        <li className='' id='d'></li>
        <li className='' id='e'></li>
        <li className='' id='f'></li>
        <li className='' id='g'></li>
        <li className='' id='h'></li>
        <li className='' id='i'></li>
      </ul>
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
