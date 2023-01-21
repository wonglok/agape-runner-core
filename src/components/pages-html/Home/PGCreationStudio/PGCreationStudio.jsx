/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { GateState } from '@/auth/GateState.ts'
import { ref, useSnapshot } from 'valtio'
import { LeftMenu } from '../Compos/LeftMenu'
import { DesktopOnly } from '@/lib/desktop/DesktopOnly'
import { SectionHeader } from '../Compos/SectionHeader'
import { StylesDashboard } from '../Compos/StylesDashboard'
import { SmartDrawer } from '../Compos/SmartDrawer'
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

export function PGCreationStudio({ content }) {
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
      <DesktopOnly>
        <StylesDashboard></StylesDashboard>
        <LeftMenu folderID={folderID}></LeftMenu>
        <SmartDrawer className=''>
          <SectionHeader
            title='Creation Studio'
            subTitle='Create the vision you make'
            bgImage='/brand/pink-yellow.svg'
            bgOffsetY={50}
            bar={
              <>
                <div className='flex items-center w-full h-full'>
                  <button
                    onClick={(ev) => {
                      onRun({ domElement: ref.current })
                    }}
                    className='inline-block w-20 h-20 mr-3 text-xs bg-white border-2 border-gray-400 shadow-xl rounded-2xl'
                  >
                    3D Asset
                  </button>
                  <button className='inline-block w-20 h-20 mr-3 text-xs bg-white border-2 border-gray-400 shadow-xl rounded-2xl'>
                    Create 3D
                  </button>
                </div>
              </>
            }
          ></SectionHeader>
          {/* <MyFolders></MyFolders> */}

          <div className='flex-none w-full max-w-full px-4 mt-4 mb-4'>
            <div className='relative flex flex-col min-w-0 mx-2 break-words bg-white border shadow-inner border-slate-400 shadow-slate-200 shadow-soft-xl rounded-2xl bg-clip-border'>
              <div className='p-4 pb-0 mb-0 rounded-t-2xl'>
                {/* <ENStudioEditor></ENStudioEditor> */}
                <div ref={ref}>1111</div>
              </div>
            </div>
          </div>
        </SmartDrawer>
      </DesktopOnly>
    </>
  )
}

//

//

//
