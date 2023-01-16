import { useEffect, useState } from 'react'
import initSwc, { transform } from '@swc/wasm-web'
const uglify = require('uglifyjs-browser')

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
          pragma: 'React.createElement',
        },
      },
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

export function ENStudioDir() {
  const [initialized, setInitialized] = useState(false)

  let input = /* jsx */ `



console.log('running hello');

export class Yo {
    constructor(){
        this.a = 1;
    }
}

window.process = {
  env: {
    NODE_ENV: 'production'
  }
};


const loadNPM = window.importNPM

export const init = async ({ domElement }) => {

  await loadNPM(['react'])

  let [{ Canvas }, { Box, OrbitControls }, ReactDOM] = await loadNPM([
      '@react-three/fiber',
      '@react-three/drei',
      'react-dom/client',
  ])

  let root = ReactDOM.createRoot(domElement, {});

  root.render(<Canvas>
    <Box></Box>
    <OrbitControls></OrbitControls>
  </Canvas>);

};

    `

  useEffect(() => {
    async function importAndRunSwcOnMount() {
      await initSwc()

      let result = await compile({ input })

      console.log(result)
      setInitialized(true)
    }
    importAndRunSwcOnMount()
  }, [])

  return (
    <div className='App'>
      <button
        onClick={() => {
          if (initialized) {
            compile()
          }
        }}
      >
        Compile
      </button>

      <iframe src={`/yoyo-link`}></iframe>
    </div>
  )
}
