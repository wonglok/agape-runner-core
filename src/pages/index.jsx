import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

import { BUCodeRunner } from '@/components/pages-html/BUCodeStudio/BUCodeRunner'

export default function SlugPage() {
  //
  let { query } = useRouter()

  let [outputs, setOutputs] = useState(false)

  useEffect(() => {
    setOutputs([
      {
        fileName: 'index.js',
        code: "function MyApp () {\n    let { Canvas } = window.R3F;\n    let { Sphere, MeshTransmissionMaterial, Environment, OrbitControls } = window.Drei;\n    let { EffectComposer, Bloom } = window.PostProc;\n \n    return React.createElement(React.Fragment, null\n        , React.createElement(Canvas, null\n            , React.createElement(Sphere, { args: [1.5,32,32],}\n                , React.createElement(MeshTransmissionMaterial, {\n                    flatShading: false,\n                    transmission: 1,\n                    roughness: 0.0,\n                    resolution: 512,\n                    thickness: 3,\n                    ior: 1.3,\n                    metalness: 0.0,\n                    reflectivity: 0.5,}\n                )\n            )\n\n            , React.createElement(Environment, { preset: \"sunset\", background: true,} )\n\n            , React.createElement(EffectComposer, null\n                , React.createElement(Bloom, { luminanceThreshold: 0.2, intensity: 1, mipmapBlur: true,} )\n            )\n\n            , React.createElement(OrbitControls, null )\n        )\n    )\n}\n\nfunction _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }\nasync function Page ({ domElement, onClean }) {\n    let [THREE, R3F, Drei, PostProc, XR3] = await Promise.all([\n        window.getThree(),\n        window.getR3F(),\n        window.getDrei(),\n        window.getPost(),\n        window.getXR()\n    ]);\n    window.THREE = THREE;\n    window.R3F = R3F;\n    window.Drei = Drei;\n    window.PostProc = PostProc;\n    window.XR3 = XR3;\n\n    window.appRoot = window.appRoot || ReactDOM.createRoot(domElement);\n    window.appRoot.render(React.createElement(MyApp, null));\n\n    onClean(() => {\n        console.log('unmount');\n        _optionalChain([window, 'optionalAccess', _ => _.appRoot, 'optionalAccess', _2 => _2.unmount, 'call', _3 => _3()]);\n        delete window.appRoot;\n    });\n}\n\nexport { Page as default };\n",
      },
    ])

    if (query && query.slug) {
      //
      let slugString = query.slug.join('/')

      console.log(slugString)
    } else {
      //!SECTION
      //
      // setOutputs([
      //   {
      //     fileName: 'index.js',
      //     code: "function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }\n\n\n\n\n\n\n//\nasync function Page ({ domElement, onClean }) {\n    let { Canvas } = await window.getR3F();\n    let { OrbitControls, Environment } = await window.getDrei();\n\n    window.appRoot = window.appRoot || ReactDOM.createRoot(domElement);\n    window.appRoot.render(React.createElement(Canvas, null\n        , React.createElement('mesh', null\n            , React.createElement('boxGeometry', { args: [1,1,1],} )\n            , React.createElement('meshStandardMaterial', { color: \"red\",} )\n        )\n\n        , React.createElement(Environment, { preset: \"apartment\", background: true,} )\n\n        , React.createElement(OrbitControls, null )\n    ));\n\n    onClean(() => {\n        console.log('unmount');\n        _optionalChain([window, 'optionalAccess', _ => _.appRoot, 'optionalAccess', _2 => _2.unmount, 'call', _3 => _3()]);\n        delete window.appRoot;\n    });\n}\n\n//\n//\n//\n\nexport { Page as default };\n",
      //   },
      // ])
    }
  }, [query])

  return <>{outputs && <BUCodeRunner outputsJSON={outputs}></BUCodeRunner>}</>
}
