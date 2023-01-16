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

export default async function Love(req, res) {
  await cors(req, res)

  let projectID = req.query.projectID
  let moduleID = req.query.moduleID
  let segments = req.query.segments

  console.log(projectID, moduleID, segments)

  res.setHeader(`Content-Type`, `application/javascript`)
  res.status(200).send(`




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
const loadNPM = window.importNPM;
export const init = async ({ domElement  })=>{
    await loadNPM([
        'react'
    ]);
    let [{ Canvas  }, { Box , OrbitControls  }, ReactDOM] = await loadNPM([
        '@react-three/fiber',
        '@react-three/drei',
        'react-dom/client'
    ]);
    let root = ReactDOM.createRoot(domElement, {});
    root.render(/*#__PURE__*/ React.createElement(Canvas, null, /*#__PURE__*/ React.createElement(Box, null), /*#__PURE__*/ React.createElement(OrbitControls, null)));
};




`)
}
