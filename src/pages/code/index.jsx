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
              console.log(v)
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


          export default {
            b:'bbbbbb',
            yo: () => {
              import('codesplit.js').then(r=>{
                console.log(r)
              })
            }
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

let myPackages = [
  { packageName: 'wonglok831', modules: MyCodeModules },
  { packageName: 'kam2', modules: MyCodeModules },
]

let makeRunCode = async ({
  packageName = 'wonlgok831',
  inputPackages = [],
}) => {
  const rollupLocalhost = `rollup://localhost/`

  const getFileName = ({ onePackage, moduleName, fileName }) => {
    let oneModule = onePackage.modules.find((e) => e.moduleName === moduleName)
    let file = oneModule.files.find((e) => e.fileName === fileName)
    return `${rollupLocalhost}${onePackage.name}/${oneModule.moduleName}/${file.fileName}`
  }

  let fileList = []

  //

  for (let onePackage of inputPackages) {
    for (let mod of onePackage.modules) {
      for (let file of mod.files) {
        fileList.push({
          rollup: `${rollupLocalhost}${onePackage.name}/${mod.moduleName}/${file.fileName}`,
          content: file.content,
        })
      }
    }
  }

  let bundle = rollup({
    input: [
      getFileName({
        onePackage: inputPackages.find((e) => e.packageName === packageName),
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
          return new URL(importee, importer).href
        },

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
          }

          return `console.log('not-found',${JSON.stringify(id)})`
        },
      },
    ],
  })

  let rawOutputs = (await (await bundle).generate({})).output

  let outputs = rawOutputs.map((e) => {
    return {
      fileName: e.fileName,
      code: e.code,
    }
  })

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
      makeRunCode({
        packageName: 'wonglok831',
        inputPackages: myPackages,
      })
    })
  }, [])

  return (
    <div>
      <div
        onClick={() => {
          let tt = setInterval(() => {
            if (canUse.current) {
              clearInterval(tt)

              makeRunCode({
                packageName: 'wonglok831',
                inputPackages: myPackages,
              })
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
