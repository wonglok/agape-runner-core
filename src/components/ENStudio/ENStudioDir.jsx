import { useEffect, useState } from 'react'
import initSwc, { transformSync } from '@swc/wasm-web'

function compile() {
  const result = transformSync(
    `

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
}

window.importNPM(['@react-three/fiber']).then((res) => {
  let [{ Canvas }] = res



  let dom = (
    <Canvas>
    </Canvas>
  );


  //

})






    `,
    {
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
        transform: null,
        target: 'es2016',
        loose: false,
        externalHelpers: false,
        keepClassNames: true,
      },

      isModule: true,

      module: {
        type: 'es6',

        // These are defaults.
        // strict: false,
        // strictMode: true,
        // lazy: false,
        // noInterop: false,
      },
    }
  )

  console.log(result.code)
}

export function ENStudioDir() {
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    async function importAndRunSwcOnMount() {
      await initSwc()

      setInitialized(true)

      compile()
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
