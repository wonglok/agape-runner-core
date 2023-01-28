import { useSnapshot } from 'valtio'
import { useRouter } from 'next/router'
// import { rollup } from 'rollup'
import { useEffect, useRef } from 'react'
// import path from 'path'
// import initSwc, { transform } from '@swc/wasm-web'
// const uglify = require('uglifyjs-browser')
// import { useState } from 'react'
// import { transform } from 'sucrase'
import { AppVersion } from '@/aws/AppVersion'
import { CSData } from '@/aws/CSData'
import { AppDev } from '@/aws/AppDev'
import { TabCoding } from './Tabs/TabCoding'
import { AppCodeFile } from '@/aws/AppCodeFile'
export function BUCodeStudio() {
  let router = useRouter()
  let app = useSnapshot(AppDev)
  useEffect(() => {
    //
    CSData.appVersionID = router.query.appVersionID

    if (CSData.appVersionID) {
      AppVersion.get({ oid: CSData.appVersionID }).then((object) => {
        AppDev.draft = object.item
        AppCodeFile.invalidate({ appVersionID: AppDev.draft.oid })
      })
    }
  }, [router.query.appVersionID])

  useEffect(() => {
    let bg = document.body
    bg.classList.add('bg-cyan-800')
    return () => {
      bg.classList.remove('bg-cyan-800')
    }
  }, [])

  return (
    <div className='w-full h-full overflow-hidden bg-white'>
      <div className='h-6 px-1 py-1 text-xs text-white bg-cyan-800'>
        3D WebApp Studio
      </div>

      {/*  */}
      <main
        className='relative text-sm'
        style={{ height: `calc(100% - 1.5rem * 2)` }}
      >
        {app.draft ? (
          <>
            <TabCoding></TabCoding>
          </>
        ) : (
          <>
            <div
              className='w-full h-full bg-white bg-gradient-to-r'
              style={
                {
                  // background: `radial-gradient(circle, rgba(193,193,193,1) 0%, rgba(45,45,45,1) 100%)`,
                }
              }
            ></div>
            <Triangle></Triangle>
          </>
        )}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
      </main>
      <div className='h-6 px-1 py-1 text-xs text-white bg-cyan-800'>
        Your love
      </div>
    </div>
  )
}

function Triangle() {
  return (
    <div
      className='absolute top-0 left-0 flex items-center justify-center w-full h-full backdrop-blur-md'
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

// function TestButton() {
//   let run = () => {
//     let appContent = {
//       appLoader: 'my-app',
//       appPackages: [
//         { packageName: 'my-app', modules: RawModules },
//         { packageName: 'page-about', modules: RawModules },
//         { packageName: 'lib-webgl', modules: RawModules },
//       ],
//       appAssets: [],
//     }
//     const bc = new BroadcastChannel('editor')

//     bc.onmessage = (event) => {
//       let action = event?.data?.action

//       if (action === 'compile') {
//         ///
//         buildApp(appContent).then((outputs) => {
//           bc.postMessage({
//             outputs,
//           })
//           // bc.close()
//         })
//       }
//     }
//     ///
//     buildApp(appContent).then((outputs) => {
//       bc.postMessage({
//         outputs,
//       })
//       // bc.close()
//     })
//   }

//   useEffect(() => {
//     run()
//   }, [])
//   return <button onClick={run}>Test</button>
// }

// function SaveButton() {
//   let refStatus = useRef()
//   let canUse = useRef(false)

//   useEffect(() => {
//     if (!refStatus.current.innerText) {
//       refStatus.current.innerText = 'Loading Editor Core...'
//       initSwc().then(() => {
//         refStatus.current.innerText = ''
//         canUse.current = true

//         ///

//         let appContent = {
//           appLoader: 'my-app',
//           appPackages: [
//             { packageName: 'my-app', modules: RawModules },
//             { packageName: 'page-about', modules: RawModules },
//             { packageName: 'lib-webgl', modules: RawModules },
//           ],
//           appAssets: [],
//         }
//         //
//         buildApp(appContent).then((outputs) => {
//           const bc = new BroadcastChannel('editor-runtime-output-signal')
//           bc.postMessage({
//             outputs,
//           })
//           bc.close()
//         })
//       })
//     }
//   }, [])

//   return (
//     <button
//       ref={refStatus}
//       onClick={() => {
//         let tt = setInterval(() => {
//           if (canUse.current) {
//             clearInterval(tt)
//             ///
//             buildApp(appContent).then((outputs) => {
//               const bc = new BroadcastChannel('editor-runtime-output-signal')
//               bc.postMessage({
//                 outputs,
//               })
//               bc.close()
//             })
//           }
//         })
//         //
//       }}
//     >
//       Save
//     </button>
//   )
// }

// let initSwc = async () => {}

// export let RawModules = [
//   {
//     moduleName: 'main',
//     files: [
//       {
//         fileName: `index.js`,
//         content: /* js */ `
//             import b from './b.js';

//             import('./codesplit.js').then((r) => {
//               console.log(r.default);
//             })
//             import('network:/manifest.json').then((v) => {
//               console.log(v.default)
//             })
//             import('@lib-webgl/main/share.js').then((v) => {
//               console.log(v.default)
//             })

//             function YoTeachApp () {
//               return <div>{Math.random()}</div>
//             }

//             export const GUI = {
//               fala: 1234,
//               yo: ({ domElement, onClean }) => {
//                 window.appRoot = window.appRoot || ReactDOM.createRoot(domElement)

//                 window.appRoot.render(<YoTeachApp></YoTeachApp>)

//                 onClean(() => {
//                   window.appRoot.unmount()
//                 })
//               }
//             }

//             console.log('GUI')

//             import('../engine-v001/index.js').then((r)=>{
//               console.log(r.default)
//             })
//             import('./json.json').then((r)=>{
//               console.log(r.default)
//             })

//             export default {
//               mod: 'main',
//               a:b
//             };
//           `,
//       },
//       {
//         fileName: `b.js`,
//         content: /* js */ `
//             export default {
//               b:'bbbbbb'
//             }
//           `,
//       },
//       {
//         fileName: `share.js`,
//         content: /* js */ `
//           export default 'sharing is caring'
//         `,
//       },
//       {
//         fileName: `json.json`,
//         content: JSON.stringify({ yo: 1234 }),
//       },
//       {
//         fileName: `codesplit.js`,
//         content: /* js */ `
//             export default {
//               yaya:'codesplit'
//             }
//           `,
//       },
//     ],
//   },
//   //
//   //
//   {
//     moduleName: 'engine-v001',
//     files: [
//       {
//         fileName: `index.js`,
//         content: /* js */ `
//             import b from './b.js';

//             import('./vanilla.js').then((r) => {
//               console.log(r.default)
//             })

//             export const GUI = {
//               fala: 1234
//             }

//             console.log('GUI', GUI)

//             export default {
//               mod: 'engine-v001',
//               a:b
//             };
//           `,
//       },
//       {
//         fileName: `b.js`,
//         content: /* js */ `
//           export default {
//             b:'bbbbbb'
//           }
//         `,
//       },
//       {
//         fileName: `vanilla.js`,
//         content: /* js */ `
//           export default {
//             yaya:'yayayayayayayaya'
//           }
//         `,
//       },
//     ],
//   },
// ]

// let appContent = {
//   appLoader: 'app-loader',
//   appPackages: [
//     { packageName: 'app-loader', modules: RawModules },
//     { packageName: 'page-about', modules: RawModules },
//     { packageName: 'lib-webgl', modules: RawModules },
//   ],
//   appAssets: [],
// }

// let buildApp = async (input) => {
//   /** @type {appContent} */
//   let app = input

//   // const { packageName, appPackages } = input

//   const rollupLocalhost = `rollup://localhost/`

//   const getFileName = ({ onePackage, moduleName, fileName }) => {
//     let oneModule = onePackage.modules.find((e) => e.moduleName === moduleName)
//     let file = oneModule.files.find((e) => e.fileName === fileName)
//     return `${rollupLocalhost}${onePackage.packageName}/${oneModule.moduleName}/${file.fileName}`
//   }

//   let fileList = []

//   for (let onePackage of app.appPackages) {
//     for (let mod of onePackage.modules) {
//       for (let file of mod.files) {
//         fileList.push({
//           rollup: `${rollupLocalhost}${onePackage.packageName}/${mod.moduleName}/${file.fileName}`,
//           content: file.content,
//         })
//       }
//     }
//   }

//   // console.log('fileList', fileList)

//   // let firstPackage = appContent.appPackages[0]

//   //
//   let bundle = rollup({
//     input: [
//       getFileName({
//         onePackage: app.appPackages.find(
//           (e) => e.packageName === app.appLoader
//         ), //firstPackage, //
//         moduleName: 'main',
//         fileName: 'index.js',
//       }),
//     ],
//     plugins: [
//       {
//         name: 'rollup-in-browser-example',
//         resolveId(importee, importer) {
//           if (!importer) {
//             return importee
//           }

//           if (importee.indexOf('@') === 0) {
//             let address = importee.replace('@', '')
//             return `${rollupLocalhost}${address}`
//           }

//           return new URL(importee, importer).href
//         },

//         async load(id) {
//           if (id.indexOf('network:') === 0) {
//             let url = id.replace('network:', '').replace(rollupLocalhost, '')

//             let info = path.parse(url)

//             if (info && info.ext === '.json') {
//               return fetch(url)
//                 .then((r) => r.json())
//                 .then((t) => {
//                   return `export default ${JSON.stringify(t)}`
//                 })
//             } else if (info && info.ext === '.js') {
//               return fetch(url)
//                 .then((r) => r.text())
//                 .then((t) => {
//                   return `${t}`
//                 })
//             }
//           }

//           let file = fileList.find((e) => e.rollup === id)

//           if (!file) {
//             return `console.log('file is not found', ${JSON.stringify(id)})`
//           }

//           if (path.parse(file.rollup)?.ext === '.json') {
//             return `export default ${file.content}`
//           }

//           if (file?.content) {
//             // return await compile({ input: file.content || '' })

//             let content = file.content || ''
//             let tf = transform(content, {
//               transforms: ['jsx', 'typescript'],
//               preserveDynamicImport: true,
//               production: true,
//               jsxPragma: 'React.createElement',
//               jsxFragmentPragma: 'React.Fragment',
//             }).code

//             // console.log(tf)
//             return tf
//           }

//           return `console.log('not-found',${JSON.stringify(id)})`
//         },
//       },
//     ],
//   })

//   let rawOutputs = (
//     await (
//       await bundle
//     ).generate({
//       //
//     })
//   ).output

//   let outputs = rawOutputs.map((e) => {
//     return {
//       fileName: e.fileName,
//       code: e.code,
//     }
//   })

//   console.log(outputs, 'outputs')

//   return outputs

//   //
// }

// // async function compile({ input }) {
// //   const result = await transform(input, {
// //     jsc: {
// //       parser: {
// //         syntax: 'ecmascript',
// //         jsx: true,
// //         dynamicImport: true,
// //         privateMethod: true,
// //         functionBind: true,
// //         exportDefaultFrom: false,
// //         packageNamespaceFrom: false,
// //         decorators: false,
// //         decoratorsBeforeExport: true,
// //         topLevelAwait: true,
// //         importMeta: true,
// //         preserveAllComments: false,
// //       },

// //       //
// //       transform: {
// //         react: {
// //           pragma: 'window.React.createElement',
// //         },
// //       },

// //       // minify: {},
// //       //
// //       target: 'es2018',
// //       loose: false,
// //       externalHelpers: false,
// //       keepClassNames: true,
// //     },

// //     isModule: true,

// //     module: {
// //       type: 'es6',
// //     },
// //   })

// //   return result.code
// // }

// // export function BUCodeStudioLab() {
// //   let router = useRouter()

// //   let refStatus = useRef()
// //   let canUse = useRef(false)

// //   useEffect(() => {
// //     if (!refStatus.current.innerText) {
// //       refStatus.current.innerText = 'Loading Editor Core...'
// //       initSwc().then(() => {
// //         refStatus.current.innerText = ''
// //         canUse.current = true

// //         ///

// //         let appContent = {
// //           appLoader: 'my-app',
// //           appPackages: [
// //             { packageName: 'my-app', modules: RawModules },
// //             { packageName: 'page-about', modules: RawModules },
// //             { packageName: 'lib-webgl', modules: RawModules },
// //           ],
// //           appAssets: [],
// //         }

// //         //
// //         buildApp(appContent).then((outputs) => {
// //           const bc = new BroadcastChannel('editor-runtime-output-signal')
// //           bc.postMessage({
// //             outputs,
// //           })
// //           bc.close()
// //         })
// //       })
// //     }
// //   }, [])

// //   return (
// //     <div>
// //       {/* {router?.query?.appVersionID} */}
// //       <div
// //         onClick={() => {
// //           let tt = setInterval(() => {
// //             if (canUse.current) {
// //               clearInterval(tt)

// //               let appContent = {
// //                 appLoader: 'my-app',
// //                 appPackages: [
// //                   { packageName: 'my-app', modules: RawModules },
// //                   { packageName: 'page-about', modules: RawModules },
// //                   { packageName: 'lib-webgl', modules: RawModules },
// //                 ],
// //                 appAssets: [],
// //               }
// //               ///
// //               buildApp(appContent).then((outputs) => {
// //                 const bc = new BroadcastChannel('editor-runtime-output-signal')
// //                 bc.postMessage({
// //                   outputs,
// //                 })
// //                 bc.close()
// //               })
// //             }
// //           })
// //           //
// //         }}
// //         className='inline-block p-5 bg-gray-200'
// //       >
// //         Save Button
// //       </div>
// //       <div ref={refStatus}></div>

// //       {/*  */}

// //       {router && <iframe src={`./run`}></iframe>}
// //     </div>
// //   )
// // }
