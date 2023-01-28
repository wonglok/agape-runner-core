import { rollup } from 'rollup'
import path from 'path'
import { transform } from 'sucrase'

export let buildApp = async (input) => {
  /** @type {appContent} */
  let app = input

  // const { packageName, appPackages } = input

  const rollupLocalhost = `rollup://localhost/`

  const getFileName = ({ onePackage, moduleName, fileName }) => {
    let oneModule = onePackage.modules.find((e) => e.moduleName === moduleName)
    let file = oneModule.files.find((e) => e.fileName === fileName)
    return `${rollupLocalhost}${onePackage.packageName}/${oneModule.moduleName}/${file.fileName}`
  }

  let fileList = []

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

  // let firstPackage = appContent.appPackages[0]

  let bundle = rollup({
    input: [
      getFileName({
        onePackage: app.appPackages.find(
          (e) => e.packageName === app.appLoader
        ), //firstPackage, //
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

          if (importee === 'three') {
            return `${location.origin}/vendor/three-r149/build/three.module.js`
          }
          if (importee.indexOf('three/examples/') === 0) {
            return `${
              location.origin
            }/vendor/three-r149/examples/${importee.replace(
              'three/examples/',
              ''
            )}`
          }

          return new URL(importee, importer).href
        },

        async load(id) {
          if (id.indexOf('http') === 0) {
            return fetch(id)
              .then((r) => r.text())
              .then((t) => {
                return `${t}`
              })
          }

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
            } else if (url.indexOf('/') === 0) {
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
            // return await compile({ input: file.content || '' })

            let content = file.content || ''
            let tf = transform(content, {
              transforms: ['jsx', 'typescript'],
              preserveDynamicImport: true,
              production: true,
              jsxPragma: 'React.createElement',
              jsxFragmentPragma: 'React.Fragment',
            }).code

            // console.log(tf)
            return tf
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

  //

  // console.log(outputs, 'outputs')

  return outputs

  //
}

export let RawModules = [
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
            import('network:/manifest.json').then((v) => {
              console.log(v.default)
            })
            import('@lib-webgl/main/share.js').then((v) => {
              console.log(v.default)
            })

            function YoTeachApp () {
              return <div>{Math.random()}</div>
            }

            export const GUI = {
              fala: 1234,
              yo: ({ domElement, onClean }) => {
                domElement.appRoot = domElement.appRoot || ReactDOM.createRoot(domElement)

                domElement.appRoot.render(<YoTeachApp></YoTeachApp>)

                onClean(() => {
                  domElement.appRoot.unmount()
                })
              }
            }

            console.log('GUI')

            import('../engine-v001/index.js').then((r)=>{
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
  //
  {
    moduleName: 'engine-v001',
    files: [
      {
        fileName: `index.js`,
        content: /* js */ `
            import b from './b.js';

            import('./vanilla.js').then((r) => {
              console.log(r.default)
            })

            export const GUI = {
              fala: 1234
            }

            console.log('GUI', GUI)

            export default {
              mod: 'engine-v001',
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
        fileName: `vanilla.js`,
        content: /* js */ `
          export default {
            yaya:'yayayayayayayaya'
          }
        `,
      },
    ],
  },
]

export let appContent = {
  appLoader: 'app-loader',
  appPackages: [
    { packageName: 'app-loader', modules: RawModules },
    { packageName: 'page-about', modules: RawModules },
    { packageName: 'lib-webgl', modules: RawModules },
  ],
}

export function TestButton() {
  let run = (bc) => {
    ///
    buildApp(appContent).then((outputs) => {
      bc.postMessage({
        outputs,
      })
      // bc.close()
    })
  }

  useEffect(() => {
    const bc = new BroadcastChannel('editor')
    bc.onmessage = (event) => {
      let action = event?.data?.action
      if (action === 'compile') {
        run(bc)
      }
    }

    return () => {
      bc.close()
    }
  }, [])
  return <button onClick={run}>Test</button>
}
