import { GPUComputationRenderer } from 'three-stdlib'
import {
  HalfFloatType,
  Vector3,
  BufferAttribute,
  CylinderGeometry,
  InstancedBufferAttribute,
  InstancedBufferGeometry,
  Vector2,
  RepeatWrapping,
  ShaderMaterial,
  Mesh,
  DataTexture,
  DataUtils,
  RGBFormat,
  PlaneBufferGeometry,
  MeshBasicMaterial,
  TextureLoader,
  Object3D,
  AdditiveBlending,
  MathUtils,
  RGBAFormat,
  DoubleSide,
  Color,
  IcosahedronBufferGeometry,
  SubtractiveBlending,
  FrontSide,
  FloatType,
} from 'three'
import { Geometry } from 'three140/examples/jsm/deprecated/Geometry.js'
import { MeshPhysicalMaterial } from 'three'
import { Core } from '@/helpers/Core'
import { generateUUID } from 'three/src/math/MathUtils'
import { MeshStandardMaterial } from 'three140'

export class LokLokWiggleSimulation {
  constructor({ node, getHeadList, howManyTracker = 10, howLongTail = 32 }) {
    this.node = node
    this.WIDTH = howLongTail
    this.HEIGHT = howManyTracker // number of trackers
    this.COUNT = this.WIDTH * this.HEIGHT
    this.getHeadList = getHeadList
    this.v3v000 = new Vector3(0, 0, 0)
    this.wait = this.setup({ node })
  }
  async setup({ node }) {
    let renderer = Core.now.canvas.now.gl

    let gpu = (this.gpu = new GPUComputationRenderer(
      this.WIDTH,
      this.HEIGHT,
      renderer
    ))

    gpu.setDataType(FloatType)

    // let makeHeadListTex = () => {
    //   let howManyTracker = this.HEIGHT
    //   // let howLongTail = this.WIDTH

    //   const textureArray = new Uint16Array(4 * 1 * howManyTracker)
    //   const handTexture = new DataTexture(
    //     textureArray,
    //     1,
    //     howManyTracker,
    //     RGBAFormat,
    //     FloatType
    //   )
    //   handTexture.needsUpdate = true

    //   let tv3 = new Vector3()
    //   return {
    //     texture: handTexture,
    //     update: ({ trackers, lerp = 1 }) => {
    //       for (let i = 0; i < trackers.length; i++) {
    //         let tracker = trackers[i]

    //         if (tracker) {
    //           // tracker.userData.px = tracker.userData.px || 0
    //           // tracker.userData.py = tracker.userData.py || 0
    //           // tracker.userData.pz = tracker.userData.pz || 0

    //           // //
    //           // tracker.userData.px = MathUtils.damp(
    //           //   tracker.userData.px,
    //           //   tracker.position.x,
    //           //   lerp,
    //           //   1 / 60
    //           // )
    //           // tracker.userData.py = MathUtils.damp(
    //           //   tracker.userData.py,
    //           //   tracker.position.y,
    //           //   lerp,
    //           //   1 / 60
    //           // )
    //           // tracker.userData.pz = MathUtils.damp(
    //           //   tracker.userData.pz,
    //           //   tracker.position.z,
    //           //   lerp,
    //           //   1 / 60

    //           // )
    //           tracker.getWorldPosition(tv3)

    //           handTexture.image.data[i * 4 + 0] = DataUtils.toHalfFloat(tv3.x)
    //           handTexture.image.data[i * 4 + 1] = DataUtils.toHalfFloat(tv3.y)
    //           handTexture.image.data[i * 4 + 2] = DataUtils.toHalfFloat(tv3.z)
    //           handTexture.image.data[i * 4 + 3] = DataUtils.toHalfFloat(1.0)
    //         }
    //       }
    //       handTexture.needsUpdate = true
    //     },
    //   }
    // }
    // this.headList = makeHeadListTex()

    const dtPosition = this.gpu.createTexture()
    const lookUpTexture = this.gpu.createTexture()
    this.fillPositionTexture(dtPosition)
    this.fillLookupTexture(lookUpTexture)

    this.positionVariable = this.gpu.addVariable(
      'texturePosition',
      this.positionShader(),
      dtPosition
    )

    this.gpu.setVariableDependencies(this.positionVariable, [
      this.positionVariable,
    ])

    this.positionUniforms = this.positionVariable.material.uniforms
    this.positionUniforms['lookup'] = { value: lookUpTexture }
    this.positionUniforms['headList'] = {
      value: this.getHeadList() || this.headList.texture,
    }
    this.node.onLoop(() => {
      this.positionUniforms['headList'] = {
        value: this.getHeadList() || this.headList.texture,
      }
    })

    let h = this.HEIGHT
    // for (let ii = 0; ii < h; ii++) {
    //   this.positionUniforms["mouse" + ii] = { value: new Vector3(0, 0, 0) };
    // }

    this.positionUniforms['time'] = { value: 0 }
    dtPosition.wrapS = RepeatWrapping
    dtPosition.wrapT = RepeatWrapping

    //
    const error = this.gpu.init()
    if (error !== null) {
      console.error(error)
    }
  }

  track({ trackers = [], lerp = 0.3, dt }) {
    if (this.headList) {
      this.headList.update({ trackers, lerp, dt })
    }
  }

  positionShader() {
    let mouseUniforms = () => {
      let str = ``
      let h = this.HEIGHT
      for (let ii = 0; ii < h; ii++) {
        str += `
          // uniform vec3 mouse${ii.toFixed(0)};
        `
      }

      return str
    }

    let lookupRightLine = () => {
      let str = `

      //
      vec2 uvv = vec2(0.5, currentLine / ${this.HEIGHT.toFixed(1)});

      float ee = uvv.y;
      vec4 texColor = texture2D(headList, uvv);

      // // yolines
      vec3 xyz = lerp(positionHead.rgb, texColor.rgb, 0.35);

      // xyz.z += sin(time * 13.0) * sin(3.141592 * 12.0 * ee) * 0.2;
      // xyz.x += cos(time * 13.0) * cos(3.141592 * 12.0 * ee) * 0.2;
      // xyz.y += cos(time * 13.0) * cos(3.141592 * 12.0 * ee) * 0.2;

      gl_FragColor = vec4(xyz.rgb, 1.0);

      `
      // let h = this.HEIGHT
      // for (let ii = 0; ii < h; ii++) {
      //   str += `d
      //     else if (currentLine == ${ii.toFixed(0)}.0) {
      //       vec4 texColor = texture2D(headList, vec2(0.0, currentLine / ${this.HEIGHT.toFixed(
      //         1
      //       )}));
      //       texColor.rgb = lerp(positionHead.rgb, texColor.rgb, 0.1);
      //       gl_FragColor = vec4(texColor.rgb, 1.0);

      //       // gl_FragColor = vec4(mouse${ii.toFixed(0)}, 1.0);
      //     }
      //   `
      // }
      return str
    }

    return /* glsl */ `
      uniform sampler2D headList;
      ${mouseUniforms()}
      uniform sampler2D lookup;
      uniform float time;
      vec3 lerp(vec3 a, vec3 b, float w)
      {
        return a + w*(b-a);
      }
      mat4 rotationX( in float angle ) {
        return mat4(	1.0,		0,			0,			0,
                0, 	cos(angle),	-sin(angle),		0,
                0, 	sin(angle),	 cos(angle),		0,
                0, 			0,			  0, 		1);
      }
      mat4 rotationY( in float angle ) {
        return mat4(	cos(angle),		0,		sin(angle),	0,
                    0,		1.0,			 0,	0,
                -sin(angle),	0,		cos(angle),	0,
                    0, 		0,				0,	1);
      }
      mat4 rotationZ( in float angle ) {
        return mat4(	cos(angle),		-sin(angle),	0,	0,
                sin(angle),		cos(angle),		0,	0,
                    0,				0,		1,	0,
                    0,				0,		0,	1);
      }

      vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
      vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
      vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}
      float cnoise(vec3 P){
        vec3 Pi0 = floor(P); // Integer part for indexing
        vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
        Pi0 = mod(Pi0, 289.0);
        Pi1 = mod(Pi1, 289.0);
        vec3 Pf0 = fract(P); // Fractional part for interpolation
        vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
        vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
        vec4 iy = vec4(Pi0.yy, Pi1.yy);
        vec4 iz0 = Pi0.zzzz;
        vec4 iz1 = Pi1.zzzz;
        vec4 ixy = permute(permute(ix) + iy);
        vec4 ixy0 = permute(ixy + iz0);
        vec4 ixy1 = permute(ixy + iz1);
        vec4 gx0 = ixy0 / 7.0;
        vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
        gx0 = fract(gx0);
        vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
        vec4 sz0 = step(gz0, vec4(0.0));
        gx0 -= sz0 * (step(0.0, gx0) - 0.5);
        gy0 -= sz0 * (step(0.0, gy0) - 0.5);
        vec4 gx1 = ixy1 / 7.0;
        vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
        gx1 = fract(gx1);
        vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
        vec4 sz1 = step(gz1, vec4(0.0));
        gx1 -= sz1 * (step(0.0, gx1) - 0.5);
        gy1 -= sz1 * (step(0.0, gy1) - 0.5);
        vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
        vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
        vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
        vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
        vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
        vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
        vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
        vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
        vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
        g000 *= norm0.x;
        g010 *= norm0.y;
        g100 *= norm0.z;
        g110 *= norm0.w;
        vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
        g001 *= norm1.x;
        g011 *= norm1.y;
        g101 *= norm1.z;
        g111 *= norm1.w;
        float n000 = dot(g000, Pf0);
        float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
        float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
        float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
        float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
        float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
        float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
        float n111 = dot(g111, Pf1);
        vec3 fade_xyz = fade(Pf0);
        vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
        vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
        float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
        return 2.2 * n_xyz;
      }

      #include <common>

			void main()	{
        // const float width = resolution.x;
        // const float height = resolution.y;
        // float xID = floor(gl_FragCoord.x);
        // float yID = floor(gl_FragCoord.y);
        //
        //
        //

        vec2 uvCursor = vec2(gl_FragCoord.x, gl_FragCoord.y) / resolution.xy;
        vec4 positionHead = texture2D( texturePosition, uvCursor );
        vec4 lookupData = texture2D(lookup, uvCursor);
        vec2 nextUV = lookupData.xy;
        float currentIDX = floor(gl_FragCoord.x);
        float currentLine = floor(gl_FragCoord.y);
        if (floor(currentIDX) == 0.0) {
          // currentIDX
          ${lookupRightLine()}
        } else {
          vec3 positionChain = texture2D(texturePosition, nextUV).xyz;

          // positionChain.rgb = lerp(positionHead.rgb, positionChain.rgb, 0.1);

          // positionChain.x += (rand(vec2(currentLine + 0.1)) * 2.0 - 1.0) * 2.0;
          // positionChain.y += (rand(vec2(currentLine + 0.2)) * 2.0 - 1.0) * 2.0;
          // positionChain.z += (rand(vec2(currentLine + 0.3)) * 2.0 - 1.0) * 2.0;

          // positionChain.x += (cnoise(positionHead.rgb * 0.01 + 0.1)) * 1.5;
          // positionChain.y += (cnoise(positionHead.rgb * 0.01 + 0.2)) * 1.5;
          // positionChain.z += (cnoise(positionHead.rgb * 0.01 + 0.3)) * 1.5;

          positionChain.xyz *= 1.0 + 0.0135 * 1.5;

          gl_FragColor = vec4(positionChain, 1.0);
        }
			}
    `
  }

  fillPositionTexture(texture) {
    let i = 0
    const theArray = texture.image.data

    for (let y = 0; y < this.HEIGHT; y++) {
      for (let x = 0; x < this.WIDTH; x++) {
        theArray[i++] = 0.0
        theArray[i++] = 0.0
        theArray[i++] = 0.0
        theArray[i++] = 0.0
      }
    }
    texture.needsUpdate = true
  }

  fillLookupTexture(texture) {
    let i = 0
    const theArray = texture.image.data
    let items = []

    for (let y = 0; y < this.HEIGHT; y++) {
      for (let x = 0; x < this.WIDTH; x++) {
        let lastOneInArray = items[items.length - 1] || [0, 0]
        theArray[i++] = lastOneInArray[0]
        theArray[i++] = lastOneInArray[1]
        theArray[i++] = this.WIDTH
        theArray[i++] = this.HEIGHT
        items.push([x / this.WIDTH, y / this.HEIGHT])
      }
    }
    texture.needsUpdate = true
  }

  render() {
    if (this.positionUniforms && this.gpu) {
      this.positionUniforms['time'].value = window.performance.now() / 1000
      this.gpu.compute()
    }

    // trackers.forEach((track, idx) => {
    //   let uniform = this.positionUniforms["mouse" + idx];
    //   if (uniform && uniform.value) {
    //     uniform.value.copy(track);
    //     // console.log(idx, track.toArray().join("-"));
    //   }
    // });
  }

  getTextureAfterCompute() {
    return {
      posTexture: this.gpu.getCurrentRenderTarget(this.positionVariable)
        .texture,
    }
  }
}

//tunnelThickness
export class LokLokWiggleDisplay {
  constructor({ node, sim }) {
    this.o3d = new Object3D()
    this.node = node
    this.sim = sim
    this.wait = this.setup({ node })
  }
  async setup({ node }) {
    let self = this

    // let camera = await node.ready.camera;
    // let renderer = await node.ready.gl;

    let { geometry, ballGeo, subdivisions, count } = new NoodleGeo({
      count: this.sim.HEIGHT,
      numSides: 4,
      subdivisions: this.sim.WIDTH,
      openEnded: false,
    })

    geometry.instanceCount = count

    let matConfig = {
      color: new Color('#58519B').offsetHSL(0, 0, 0.0),
      // color: new Color('#ffffff'),
      emissive: new Color('#58519B').offsetHSL(0, 0, 0.0),
      emissiveIntensity: 3.5,

      // emissive: new Color('#018888'),
      side: FrontSide,
      // transmission: 1,
      // reflectivity: 1.5,
      // metalness: 0,
      // roughness: 0,
      // thickness: 4,
      // transmission: 1,
      // ior: 1.3,
      // transparent: true,
      // opacity: 1,
      // // transmission: 1.0,
      // color: new Color('#01ffff'),
      // // vertexColors: false,
      // emissive: new Color('#017777'),
      // reflectivity: 0.5,
      // attenuationColor: new Color('#ffffff'),
    }

    let matLine1 = new MeshStandardMaterial({
      ...matConfig,
      // side: DoubleSide,
      // metalness: 0.1,
      // roughness: 0.2,
      // thickness: 4,
      // transmission: 1,
      // ior: 1.3,
      // transparent: true,
      // opacity: 1,
      // // transmission: 1.0,
      // color: new Color('#ffffff'),
      // // vertexColors: false,
      // emissive: new Color('#000000').offsetHSL(0, 0, 0.0),
      // reflectivity: 0.5,
    })

    matLine1.userData.uniforms = {
      posTexture: { value: 0 },
      time: { value: 0 },
    }
    matLine1.onBeforeCompile = (shader, renderer) => {
      shader.uniforms.posTexture = matLine1.userData.uniforms.posTexture
      shader.uniforms.time = matLine1.userData.uniforms.time

      let atBeginV = /* glsl */ `
      precision highp float;
      // #define PI 3.1415926535897932384626433832795


      #define lengthSegments ${subdivisions.toFixed(1)}
      attribute float angle;
      // attribute float newPosition;
      attribute float tubeInfo;
      attribute vec4 offset;

      uniform sampler2D posTexture;

      vec3 getP3OfTex (float t, float lineIDXER) {
        vec4 color = texture2D(posTexture,
          vec2(
            t,
            lineIDXER / ${this.sim.HEIGHT.toFixed(1)}
          )
        );
        return color.rgb;
      }

      vec3 sampleLine (float t) {
        vec3 pt = (offset.xyz + 0.5) * 0.0;


        float lineIDXER = offset.w;
        pt += getP3OfTex(t, lineIDXER);

        return pt;
      }

      void createTube (float t, vec2 volume, out vec3 pos, out vec3 normal) {
        // find next sample along curve
        float nextT = t + (1.0 / lengthSegments);

        // sample the curve in two places
        vec3 cur = sampleLine(t);
        vec3 next = sampleLine(nextT);

        // compute the Frenet-Serret frame
        vec3 T = normalize(next - cur);
        vec3 B = normalize(cross(T, next + cur));
        vec3 N = -normalize(cross(B, T));
        // extrude outward to create a tube
        float tubeAngle = angle;
        float circX = cos(tubeAngle);
        float circY = sin(tubeAngle);

        // compute position and normal
        normal.xyz = normalize(B * circX + N * circY);
        pos.xyz = cur + B * volume.x * circX + N * volume.y * circY;
      }

      vec3 makeGeo () {
        float t = (tubeInfo) + 0.5;
        // t *= 2.0;
        float thickness = 0.03 * 100.0 * 0.5 * (1.0 - t);

        vec2 volume = vec2(thickness);
        vec3 transformedYo;
        vec3 objectNormal;
        createTube(t, volume, transformedYo, objectNormal);

        // vec3 transformedNormal = normalMatrix * objectNormal;

        return transformedYo;
      }

      vec3 makeGeoNormal () {
        float t = (tubeInfo) + 0.5;
        // t *= 2.0;
        float thickness = 0.03 * 100.3;

        vec2 volume = vec2(thickness);
        vec3 transformedYo;
        vec3 objectNormal;
        createTube(t, volume, transformedYo, objectNormal);

        // vec3 transformedNormal = normalMatrix * objectNormal;

        return objectNormal;
      }

        `

      let transformV3 = `


            vec3 nPos = makeGeo();
            vec3 transformed = vec3( nPos );

      `

      let transformV3Normal = `

            vec3 nPosNormal = makeGeoNormal();
            vec3 objectNormal = vec3( nPosNormal );

            // #ifdef USE_TANGENT
            //   vec3 objectTangent = vec3( tangent.xyz );
            // #endif
            `

      // let atEndV = `

      // `

      //
      shader.vertexShader = shader.vertexShader.replace(
        `void main() {`,
        `${atBeginV.trim()} void main() {`
      )

      shader.vertexShader = shader.vertexShader.replace(
        `#include <begin_vertex>`,
        `${transformV3}`
      )
      shader.vertexShader = shader.vertexShader.replace(
        `#include <beginnormal_vertex>`,
        `${transformV3Normal}`
      )
    }
    let line1 = new Mesh(geometry, matLine1)
    line1.userData.enableBloom = true
    this.o3d.add(line1)
    line1.visible = true
    node.onClean(() => {
      this.o3d.remove(line1)
    })
    line1.frustumCulled = false
    line1.userData.enableBloom = true

    ///

    class BallMataterial extends MeshPhysicalMaterial {
      constructor({ ...props }) {
        super({
          ...props,
        })
        //
        //

        this.onBeforeCompile = (shader, gl) => {
          //
          shader.uniforms.time = { value: 0 }
          shader.uniforms.posTexture = { value: null }

          //
          self.sim.wait.then(() => {
            node.onLoop(() => {
              let result = self.sim.getTextureAfterCompute()
              shader.uniforms.posTexture.value = result.posTexture
              shader.uniforms.time.value = window.performance.now() / 1000
            })
          })

          shader.vertexShader = shader.vertexShader.replace(
            `#include <common>`,
            `#include <common>

            attribute vec4 offset;
            uniform sampler2D posTexture;
            uniform float time;

          `
          )
          shader.vertexShader = shader.vertexShader.replace(
            '#include <begin_vertex>',
            /* glsl */ `

            float lineIDXER = offset.w;
            float fling = time + lineIDXER  / ${self.sim.HEIGHT.toFixed(1)};
            vec4 coord = texture2D(posTexture, vec2(0.5, lineIDXER / ${self.sim.HEIGHT.toFixed(
              1
            )}));

            vec3 transformed = position.rgb * 0.1 + coord.rgb;
            `
          )
        }
        //
        //
      }
    }

    let matBall0 = new BallMataterial({
      // side: DoubleSide,
      // metalness: 0.2,
      // roughness: 0.2,
      // thickness: 4,
      // transmission: 1,
      // ior: 1.3,
      // transparent: true,
      // opacity: 1,
      // // transmission: 1.0,
      // color: new Color('#ffffff'),
      // // vertexColors: false,
      // emissive: new Color('#007777').offsetHSL(0, 0, 0.0),
      // reflectivity: 0.5,

      ...matConfig,
    })

    //

    // let ball0 = new Mesh(ballGeo, matBall0)
    // ball0.userData.enableBloom = true

    // this.o3d.add(ball0)
    // node.onClean(() => {
    //   this.o3d.remove(ball0)
    // })

    // ball0.frustumCulled = false
    // ball0.userData.enableBloom = true

    await this.sim.wait
    node.onLoop(() => {
      let result = this.sim.getTextureAfterCompute()
      // matLine0.uniforms.posTexture.value = result.posTexture
      // matLine0.uniforms.time.value = window.performance.now() / 1000
      matLine1.userData.uniforms.posTexture.value = result.posTexture
      matLine1.userData.uniforms.time.value = window.performance.now() / 1000
    })
  }
}

class NoodleGeo {
  constructor(props) {
    let {
      count = 20,
      numSides = 4,
      subdivisions = 50,
      openEnded = true,
    } = props
    const radius = 1
    const length = 1

    const cylinderBufferGeo = new CylinderGeometry(
      radius,
      radius,
      length,
      numSides,
      subdivisions,
      openEnded
    )

    let baseGeometry = new Geometry()
    baseGeometry = baseGeometry.fromBufferGeometry(cylinderBufferGeo)

    baseGeometry.rotateZ(Math.PI / 2)

    // compute the radial angle for each position for later extrusion
    const tmpVec = new Vector2()
    const xPositions = []
    const angles = []
    const uvs = []
    const vertices = baseGeometry.vertices
    const faceVertexUvs = baseGeometry.faceVertexUvs[0]
    const oPositions = []

    // Now go through each face and un-index the geometry.
    baseGeometry.faces.forEach((face, i) => {
      const { a, b, c } = face
      const v0 = vertices[a]
      const v1 = vertices[b]
      const v2 = vertices[c]
      const verts = [v0, v1, v2]
      const faceUvs = faceVertexUvs[i]

      // For each vertex in this face...
      verts.forEach((v, j) => {
        tmpVec.set(v.y, v.z).normalize()

        // the radial angle around the tube
        const angle = Math.atan2(tmpVec.y, tmpVec.x)
        angles.push(angle)

        // "arc length" in range [-0.5 .. 0.5]
        xPositions.push(v.x)
        oPositions.push(v.x, v.y, v.z)

        // copy over the UV for this vertex
        uvs.push(faceUvs[j].toArray())
      })
    })

    // build typed arrays for our attributes
    const posArray = new Float32Array(xPositions)
    const angleArray = new Float32Array(angles)
    const uvArray = new Float32Array(uvs.length * 2)

    const origPosArray = new Float32Array(oPositions)

    // unroll UVs
    for (let i = 0; i < posArray.length; i++) {
      const [u, v] = uvs[i]
      uvArray[i * 2 + 0] = u
      uvArray[i * 2 + 1] = v
    }

    const lineGeo = new InstancedBufferGeometry()
    lineGeo.instanceCount = count

    lineGeo.setAttribute('position', new BufferAttribute(origPosArray, 3))
    lineGeo.setAttribute('tubeInfo', new BufferAttribute(posArray, 1))
    lineGeo.setAttribute('angle', new BufferAttribute(angleArray, 1))
    lineGeo.setAttribute('uv', new BufferAttribute(uvArray, 2))

    let offset = []
    let ddxyz = Math.floor(Math.pow(count, 1 / 3))
    let iii = 0
    for (let z = 0; z < ddxyz; z++) {
      for (let y = 0; y < ddxyz; y++) {
        for (let x = 0; x < ddxyz; x++) {
          offset.push(
            0.0, //  * (x / ddxyz) * 2.0 - 1.0,
            0.0, //  * (y / ddxyz) * 2.0 - 1.0,
            0.0, //  * (z / ddxyz) * 2.0 - 1.0,
            iii
          )
          iii++
        }
      }
    }

    // let ddxyz = Math.floor(Math.pow(count, 1 / 2));
    // for (let y = 0; y < ddxyz; y++) {
    //   for (let x = 0; x < ddxyz; x++) {
    //     offset.push(0.0, (x / ddxyz) * 2.0 - 1.0, (y / ddxyz) * 2.0 - 1.0);
    //   }
    // }

    lineGeo.setAttribute(
      'offset',
      new InstancedBufferAttribute(new Float32Array(offset), 4)
    )

    let isoGeo = new IcosahedronBufferGeometry(0.4, 3)

    let ballGeo = new InstancedBufferGeometry()
    ballGeo = ballGeo.copy(isoGeo)
    ballGeo.instanceCount = count

    ballGeo.setAttribute(
      'offset',
      new InstancedBufferAttribute(new Float32Array(offset), 4)
    )

    // let eachLineIdx = []
    // for (let c = 0; c < count; c++) {
    //   eachLineIdx.push(c)
    // }

    // lineGeo.setAttribute(
    //   "lineIDXER",
    //   new InstancedBufferAttribute(new Float32Array(eachLineIdx), 1)
    // );

    return {
      ...props,
      dataLength: posArray.length,
      geometry: lineGeo,
      ballGeo,
    }
  }
}

export class NoodleO3 {
  constructor({
    node,
    getHeadList = () => {},
    howManyTrackers = 8,
    tailLength = 64,
  }) {
    this.o3d = new Object3D()
    this.node = node
    this.howManyTrackers = howManyTrackers
    this.tailLength = tailLength
    this.getHeadList = getHeadList
    this.setup({ node })
  }
  async setup({ node }) {
    //
    let sim = new LokLokWiggleSimulation({
      getHeadList: this.getHeadList,
      node,
      howManyTracker: this.howManyTrackers,
      howLongTail: this.tailLength,
    })

    let display = new LokLokWiggleDisplay({ node, sim })

    this.o3d.add(display.o3d)

    node.onClean(() => {
      this.o3d.remove(display.o3d)
    })

    this.track = ({ trackers = [], lerp = 1.0, dt }) => {
      sim.track({ trackers, lerp, dt })
      sim.render({
        //
      })
    }
  }
}

NoodleO3.key = generateUUID()
