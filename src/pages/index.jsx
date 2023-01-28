import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

import { BUCodeRunner } from '@/components/pages-html/BUCodeStudio/BUCodeRunner'

export default function SlugPage() {
  //
  let { query } = useRouter()

  let [outputs, setOutputs] = useState(false)

  useEffect(() => {
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

  return <>{outputs && <BUCodeRunner outputs={outputs}></BUCodeRunner>}</>
}
