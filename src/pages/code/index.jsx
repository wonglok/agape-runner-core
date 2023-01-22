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

export let MyCodeModules = [
  {
    moduleName: 'main',
    files: [
      {
        fileName: `index.js`,
        content: /* js */ `
            import b from './b.js';

            import('./codesplit.js').then((r) => {
              console.log(r.default);

            })

            import('network:/manifest.json').then((v)=>{
              console.log(v.default)
            })

            import('@resuables/main/share.js').then((v)=>{
              console.log(v.default)
            })

            function Yo () {
              return <div>{Math.random()}</div>
            }
            // console.log()
            export const GUI = {
              yoyo: 1234,
              yo: ({ domElement, onClean }) => {
                window.root = window.root || ReactDOM.createRoot(domElement)

                window.root.render(<Yo></Yo>)

                onClean(() => {
                  window.root.unmount()
                })
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
        fileName: `share.js`,
        content: /* js */ `
          export default 'sharing is caring'
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
              yaya:'codesplit'
            }
          `,
      },
    ],
  },
  //
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

//
//
let appSource = {
  appName: 'wonglok831',
  appPackages: [
    { packageName: 'wonglok831', modules: MyCodeModules },
    { packageName: 'resuables', modules: MyCodeModules },
  ],
}

//

let buildApp = async (input) => {
  /** @type {{ appName: '', appPackages: [{[ packageName: '', modules: [{ moduleName: '', files: [{fileName: '', content: ''] }] ]}] }} */
  let app = input
  // const { appName, appPackages } = input
  const rollupLocalhost = `rollup://localhost/`

  const getFileName = ({ onePackage, moduleName, fileName }) => {
    let oneModule = onePackage.modules.find((e) => e.moduleName === moduleName)
    let file = oneModule.files.find((e) => e.fileName === fileName)
    return `${rollupLocalhost}${onePackage.packageName}/${oneModule.moduleName}/${file.fileName}`
  }

  let fileList = []

  //

  for (let onePackage of app.appPackages) {
    for (let mod of onePackage.modules) {
      for (let file of mod.files) {
        fileList.push({
          rollup: `${rollupLocalhost}${onePackage.packageName}/${mod.moduleName}/${file.fileName}`,
          content: file.content,
        })
      }
    }
  }
  // console.log('fileList', fileList)

  let bundle = rollup({
    input: [
      getFileName({
        onePackage: app.appPackages.find((e) => e.packageName === app.appName),
        moduleName: 'main',
        fileName: 'index.js',
      }),
    ],
    plugins: [
      {
        name: 'rollup-in-browser-example',
        resolveId(importee, importer) {
          if (!importer) {
            return importee
          }

          if (importee.indexOf('@') === 0) {
            let address = importee.replace('@', '')
            return `${rollupLocalhost}${address}`
          }

          return new URL(importee, importer).href
        },

        async load(id) {
          if (id.indexOf('network:') === 0) {
            let url = id.replace('network:', '').replace(rollupLocalhost, '')

            let info = path.parse(url)

            if (info && info.ext === '.json') {
              return fetch(url)
                .then((r) => r.json())
                .then((t) => {
                  return `export default ${JSON.stringify(t)}`
                })
            } else if (info && info.ext === '.js') {
              return fetch(url)
                .then((r) => r.text())
                .then((t) => {
                  return `${t}`
                })
            }
          }

          let file = fileList.find((e) => e.rollup === id)

          if (!file) {
            return `console.log('file is not found', ${JSON.stringify(id)})`
          }

          if (path.parse(file.rollup)?.ext === '.json') {
            return `export default ${file.content}`
          }

          if (file?.content) {
            return await compile({ input: file.content || '' })
          }

          return `console.log('not-found',${JSON.stringify(id)})`
        },
      },
    ],
  })

  let rawOutputs = (
    await (
      await bundle
    ).generate({
      //
    })
  ).output

  let outputs = rawOutputs.map((e) => {
    return {
      fileName: e.fileName,
      code: e.code,
    }
  })

  // console.log(outputs)

  const bc = new BroadcastChannel('editor-runtime-output-signal')
  bc.postMessage({
    outputs,
  })
  bc.close()
}

export default function Both() {
  let refStatus = useRef()
  let canUse = useRef(false)

  useEffect(() => {
    refStatus.current.innerText = 'Loading Editor Core...'
    initSwc().then(() => {
      refStatus.current.innerText = ''
      canUse.current = true

      ///
      buildApp(appSource)
    })
  }, [])

  return (
    <div>
      <div
        onClick={() => {
          let tt = setInterval(() => {
            if (canUse.current) {
              clearInterval(tt)

              buildApp(appSource)
            }
          })
          //
        }}
        className='inline-block p-5 bg-gray-200'
      >
        Send RunData
      </div>
      <div ref={refStatus}></div>

      {/*  */}

      <iframe src={`/code/run`}></iframe>
    </div>
  )
}
