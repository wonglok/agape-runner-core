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

let makeRunCode = async ({ iframe }) => {
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

  // console.log(
  //   outputs.map((e) => {
  //     return {
  //       fileName: e.fileName,
  //       code: e.code,
  //     }
  //   })
  // )

  const bc = new BroadcastChannel('webgl_channel_' + 'aabbcc123412321321')
  bc.postMessage({
    outputs,
  })
  // iframe
}

export default function Both() {
  let refFrame = useRef()
  let canUse = useRef(false)
  useEffect(() => {
    initSwc().then(() => {
      canUse.current = true
    })
  }, [])
  return (
    <div>
      <div
        onClick={() => {
          //

          let tt = setInterval(() => {
            if (canUse.current) {
              clearInterval(tt)
              makeRunCode({ iframe: refFrame.current })
            }
          })
          //
        }}
      >
        Send RunData
      </div>
      {/*  */}

      {/*  */}

      <iframe ref={refFrame} src={`/code/run`}></iframe>
    </div>
  )
}
