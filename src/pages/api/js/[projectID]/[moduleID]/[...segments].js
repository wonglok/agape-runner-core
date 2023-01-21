import Cors from 'cors'

// import UglifyJS from 'uglify-js'

function initMiddleware(middleware) {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result)
        }
        return resolve(result)
      })
    })
}

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
  })
)

let ENV_STR = `
window.process = {
    env: {
        NODE_ENV: 'development'
    }
};
`
let CODE = /* jsx */ `

console.log('running hello');
export class Yo {
    constructor(){
        this.a = 1;
    }
}
const loadNPM = window.importNPM;
export const init = async ({ domElement })=>{


    domElement.innerHTML = ''

    // importShim('three')
    // let [React] = await loadNPM([
    //     'react'
    // ]);

    // let [{default: anime}, { Canvas }, { Box , OrbitControls , Caustics , TorusKnot , MeshTransmissionMaterial , Lightformer , Environment  }, ReactDOM] = await loadNPM([
    //     'animejs',
    //     '@react-three/fiber',
    //     '@react-three/drei',
    //     'react-dom/client'
    // ]);

    // await anime({
    //   targets: [domElement],
    //   opacity: 0,
    // }).finished

    // let root = ReactDOM.createRoot(domElement, {});

    // root.render(/*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Canvas, null, /*#__PURE__*/ React.createElement(Caustics, {
    //     backfaces: true,
    //     color: [
    //         1,
    //         0.8,
    //         0.8
    //     ],
    //     focus: [
    //         0,
    //         -1.2,
    //         0
    //     ],
    //     lightSource: [
    //         -2,
    //         2.5,
    //         -2.5
    //     ],
    //     frustum: 1.75,
    //     intensity: 0.5,
    //     worldRadius: 0.66 / 10,
    //     ior: 0.6,
    //     backfaceIor: 1.26
    // }, /*#__PURE__*/ React.createElement(TorusKnot, {
    //     position: [
    //         0,
    //         15,
    //         0
    //     ],
    //     args: [
    //         15,
    //         3,
    //         128,
    //         64,
    //         1,
    //         2
    //     ]
    // }, /*#__PURE__*/ React.createElement(MeshTransmissionMaterial, {
    //     thickness: 0.2,
    //     chromaticAberration: 0.05,
    //     anisotropy: 1.5,
    //     clearcoat: 1,
    //     clearcoatRoughness: 0.2,
    //     envMapIntensity: 3,
    //     roughness: 0.4
    // }))), /*#__PURE__*/ React.createElement(Environment, {
    //     frames: 1,
    //     preset: "city",
    //     resolution: 256,
    //     background: true,
    //     blur: 0.8
    // }, /*#__PURE__*/ React.createElement(Lightformer, {
    //     intensity: 4,
    //     "rotation-x": Math.PI / 2,
    //     position: [
    //         0,
    //         5,
    //         -9
    //     ],
    //     scale: [
    //         10,
    //         10,
    //         1
    //     ]
    // }), /*#__PURE__*/ React.createElement(Lightformer, {
    //     intensity: 4,
    //     "rotation-x": Math.PI / 2,
    //     position: [
    //         0,
    //         5,
    //         -9
    //     ],
    //     scale: [
    //         10,
    //         10,
    //         1
    //     ]
    // }), /*#__PURE__*/ React.createElement("group", {
    //     rotation: [
    //         Math.PI / 2,
    //         1,
    //         0
    //     ]
    // }, [
    //     2,
    //     -2,
    //     2,
    //     -4,
    //     2,
    //     -5,
    //     2,
    //     -9
    // ].map((x, i)=>/*#__PURE__*/ React.createElement(Lightformer, {
    //         key: i,
    //         intensity: 1,
    //         rotation: [
    //             Math.PI / 4,
    //             0,
    //             0
    //         ],
    //         position: [
    //             x,
    //             4,
    //             i * 4
    //         ],
    //         scale: [
    //             4,
    //             1,
    //             1
    //         ]
    //     })), /*#__PURE__*/ React.createElement(Lightformer, {
    //     intensity: 0.5,
    //     "rotation-y": Math.PI / 2,
    //     position: [
    //         -5,
    //         1,
    //         -1
    //     ],
    //     scale: [
    //         50,
    //         2,
    //         1
    //     ]
    // }), /*#__PURE__*/ React.createElement(Lightformer, {
    //     intensity: 0.5,
    //     "rotation-y": Math.PI / 2,
    //     position: [
    //         -5,
    //         -1,
    //         -1
    //     ],
    //     scale: [
    //         50,
    //         2,
    //         1
    //     ]
    // }), /*#__PURE__*/ React.createElement(Lightformer, {
    //     intensity: 0.5,
    //     "rotation-y": -Math.PI / 2,
    //     position: [
    //         10,
    //         1,
    //         0
    //     ],
    //     scale: [
    //         50,
    //         2,
    //         1
    //     ]
    // })), /*#__PURE__*/ React.createElement("group", null, /*#__PURE__*/ React.createElement(Lightformer, {
    //     intensity: 5,
    //     form: "ring",
    //     color: "red",
    //     "rotation-y": Math.PI / 2,
    //     position: [
    //         -5,
    //         2,
    //         -1
    //     ],
    //     scale: [
    //         10,
    //         10,
    //         1
    //     ]
    // }))), /*#__PURE__*/ React.createElement(OrbitControls, {
    //     "object-position": [
    //         0,
    //         5,
    //         5
    //     ]
    // }))));

    // await anime({
    //   targets: [domElement],
    //   opacity: 1,
    //   delay: 500
    // }).finished
};

`

export default async function Love(req, res) {
  await cors(req, res)

  let projectID = req.query.projectID
  let moduleID = req.query.moduleID
  let segments = req.query.segments

  console.log(projectID, moduleID, segments)

  res.setHeader(`Content-Type`, `application/javascript`)
  res.status(200).send(`

${ENV_STR}

${CODE}



`)
}
