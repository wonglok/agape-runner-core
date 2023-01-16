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

export function ENStudioEditor() {
  const [initialized, setInitialized] = useState(false)

  let input = /* jsx */ `

console.log('running hello');

export class Yo {
  constructor(){
      this.a = 1;
  }
}

const loadNPM = window.importNPM



export const init = async ({ domElement }) => {

  await loadNPM(['react'])

  let [{ Canvas }, { Box, OrbitControls, Caustics, TorusKnot, MeshTransmissionMaterial, Lightformer, Environment }, ReactDOM] = await loadNPM([
      '@react-three/fiber',
      '@react-three/drei',
      'react-dom/client',
  ])

  let root = ReactDOM.createRoot(domElement, {});

  root.render(
  <>
    <Canvas>

      <Caustics
        backfaces
        color={[1, 0.8, 0.8]}
        focus={[0, -1.2, 0]}
        lightSource={[-2, 2.5, -2.5]}
        frustum={1.75}
        intensity={0.5}
        worldRadius={0.66 / 10}
        ior={0.6}
        backfaceIor={1.26}>

        <TorusKnot position={[0, 15, 0]} args={[15, 3, 128, 64, 1, 3]}>
          <MeshTransmissionMaterial thickness={0.2} chromaticAberration={0.05} anisotropy={1.5} clearcoat={1} clearcoatRoughness={0.2} envMapIntensity={3} />
        </TorusKnot>
      </Caustics>

      <Environment frames={Infinity} preset="city" resolution={256} background blur={0.8}>
        <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
        <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
        <group rotation={[Math.PI / 2, 1, 0]}>
          {[2, -2, 2, -4, 2, -5, 2, -9].map((x, i) => (
            <Lightformer key={i} intensity={1} rotation={[Math.PI / 4, 0, 0]} position={[x, 4, i * 4]} scale={[4, 1, 1]} />
          ))}
          <Lightformer intensity={0.5} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[50, 2, 1]} />
          <Lightformer intensity={0.5} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[50, 2, 1]} />
          <Lightformer intensity={0.5} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[50, 2, 1]} />
        </group>
        <group>
          <Lightformer intensity={5} form="ring" color="red" rotation-y={Math.PI / 2} position={[-5, 2, -1]} scale={[10, 10, 1]} />
        </group>
      </Environment>

      <OrbitControls object-position={[0,5,5]}></OrbitControls>
    </Canvas>
  </>
  );

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
        onClick={async () => {
          if (initialized) {
            let result = await compile({ input })
            console.log(result)
          }
        }}
      >
        Compile
      </button>

      <iframe src={`/yoyo-link`}></iframe>
    </div>
  )
}
