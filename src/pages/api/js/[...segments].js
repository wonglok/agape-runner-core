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

  let segments = req.query.segments

  console.log(segments)

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
window.importNPM([
    '@react-three/fiber'
]).then((res)=>{
    let [{ Canvas  }] = res;
    let dom = /*#__PURE__*/ React.createElement(Canvas, null);

    console.log(dom);
});


`)
}
