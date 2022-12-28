import {
  Color,
  DataTexture,
  FloatType,
  Object3D,
  RGBAFormat,
  Vector3,
  Mesh,
  InstancedBufferAttribute,
  InstancedBufferGeometry,
  IcosahedronBufferGeometry,
  MeshPhysicalMaterial,
  PointLight,
} from 'three'
import { CustomGPU } from './CustomGPU'
import { Core } from '@/helpers/Core'

export class PhysicsCompute {
  set shader(v) {
    this._shader = v
    this.setSimShader(v)
  }
  get shader() {
    return this.a
  }
  constructor({ tracker, sizeX, sizeY } = {}) {
    this.sizeX = sizeX
    this.sizeY = sizeY

    //
    this._shader = ''
    this.setSimShader = () => {}
    this.tracker = tracker

    this.core = Core.makeDisposableNode({ name: 'vortex' }).sub
    let gl = Core.now.canvas.now.gl

    let SIZE_X = this.sizeX
    let SIZE_Y = this.sizeY

    let gpuCompute = new CustomGPU(SIZE_X, SIZE_Y, gl)
    //
    gpuCompute.setDataType(FloatType)

    // pos IDX
    let posIdx_data = new Float32Array(SIZE_X * SIZE_Y * 4)
    let posIdx = new DataTexture(
      posIdx_data,
      SIZE_X,
      SIZE_Y,
      RGBAFormat,
      FloatType
    )

    //
    let p

    p = 0
    for (let j = 0; j < SIZE_X; j++) {
      for (let i = 0; i < SIZE_Y; i++) {
        let id = p / 4
        posIdx_data[p + 0] = id % 6 // square 1 / 6 index
        posIdx_data[p + 1] = Math.floor(id / 6) // square
        posIdx_data[p + 2] = (SIZE_Y * SIZE_X) / 6.0 // total
        posIdx_data[p + 3] = id
        p += 4
      }
    }

    // pos IDX
    let posDynamic_data = new Float32Array(SIZE_X * SIZE_Y * 4)
    let posDynamic = new DataTexture(
      posDynamic_data,
      SIZE_X,
      SIZE_Y,
      RGBAFormat,
      FloatType
    )

    p = 0
    for (let j = 0; j < SIZE_Y; j++) {
      for (let i = 0; i < SIZE_X; i++) {
        posDynamic_data[p + 0] = 0
        posDynamic_data[p + 1] = 0
        posDynamic_data[p + 2] = 0
        posDynamic_data[p + 3] = 1.0
        p += 4
      }
    }

    let vortexShader = /* glsl */ `
#include <common>

precision highp float;
precision highp sampler2D;

uniform vec3 trackerPos;

uniform float iTime;
uniform sampler2D tIdx;

mat3 rotateX(float rad) {
    float c = cos(rad);
    float s = sin(rad);
    return mat3(
        1.0, 0.0, 0.0,
        0.0, c, s,
        0.0, -s, c
    );
}

mat3 rotateY(float rad) {
    float c = cos(rad);
    float s = sin(rad);
    return mat3(
        c, 0.0, -s,
        0.0, 1.0, 0.0,
        s, 0.0, c
    );
}

mat3 rotateZ(float rad) {
    float c = cos(rad);
    float s = sin(rad);
    return mat3(
        c, s, 0.0,
        -s, c, 0.0,
        0.0, 0.0, 1.0
    );
}

mat3 rotateQ (vec3 axis, float rad) {
    float hr = rad / 2.0;
    float s = sin( hr );
    vec4 q = vec4(axis * s, cos( hr ));
    vec3 q2 = q.xyz + q.xyz;
    vec3 qq2 = q.xyz * q2;
    vec2 qx = q.xx * q2.yz;
    float qy = q.y * q2.z;
    vec3 qw = q.w * q2.xyz;

    return mat3(
        1.0 - (qq2.y + qq2.z),  qx.x - qw.z,            qx.y + qw.y,
        qx.x + qw.z,            1.0 - (qq2.x + qq2.z),  qy - qw.x,
        qx.y - qw.y,            qy + qw.x,              1.0 - (qq2.x + qq2.y)
    );
}


#define M_PI 3.1415926535897932384626433832795
float atan2(in float y, in float x) {
  bool xgty = (abs(x) > abs(y));
  return mix(M_PI/2.0 - atan(x,y), atan(y,x), float(xgty));
}
vec3 fromBall(float r, float az, float el) {
  return vec3(
    r * cos(el) * cos(az),
    r * cos(el) * sin(az),
    r * sin(el)
  );
}
void toBall(vec3 pos, out float az, out float el) {
  az = atan2(pos.y, pos.x);
  el = atan2(pos.z, sqrt(pos.x * pos.x + pos.y * pos.y));
}
// float az = 0.0;
// float el = 0.0;
// vec3 noiser = vec3(lastVel);
// toBall(noiser, az, el);
// lastVel.xyz = fromBall(1.0, az, el);


uniform vec3 mousePos;
uniform vec3 screen;
uniform float enterCirlce;

  vec3 lerp(vec3 a, vec3 b, float w)
      {
        return a + w*(b-a);
      }

void main ()	{

  float time = iTime;
  vec2 cellSize = 1.0 / resolution.xy;
  vec2 newCell = gl_FragCoord.xy;
  vec2 uv = newCell * cellSize;
  vec4 pos = vec4(0.0);
  vec3 pp  = pos.xyz;

  pos.xyz = pos.xyz;

  float az = 0.0;
  float el = 0.0;
  vec3  noiser = vec3(
    rand(uv.xy + 0.1) * 2.0 - 1.0,
    rand(uv.xy + 0.2) * 2.0 - 1.0,
    rand(uv.xy + 0.3) * 2.0 - 1.0
  );
  toBall(noiser, az, el);
  az += sin(time + uv.x * 3.14);
  el += cos(time + uv.x * 3.14);
  pos.xyz = trackerPos + vec3(0.0, 1.0, 0.0) + rotateY(time) * fromBall(150.9 + 0.5 * sin(time), az, el);
  gl_FragColor.rgb = pos.rgb;
  gl_FragColor.w = 1.0;


}
`

    let posVar = gpuCompute.addVariable('tPos', vortexShader, posDynamic)

    posVar.material.uniforms.tIdx = { value: posIdx }
    posVar.material.uniforms.iTime = { value: 0 }

    this.core.onLoop((dt) => {
      posVar.material.uniforms.iTime.value += dt
    })
    posVar.material.uniforms.mousePos = { value: new Vector3(0, 0, 0) }
    posVar.material.uniforms.screen = {
      value: new Vector3(window.innerWidth, window.innerHeight, 0.0),
    }
    posVar.material.uniforms.enterCirlce = { value: 0 }
    posVar.material.uniforms.trackerPos = { value: this.tracker.position }

    this.setSimShader = (code) => {
      let str =
        `
      //  uniform sampler2D tPos;
      ` +
        vortexShader +
        ''

      str = str.replace('/*insert_here*/', code)

      let mat = gpuCompute.createShaderMaterial(str, posVar.material.uniforms)

      // console.log(mat)

      posVar.material = mat
      posVar.material.needsUpdate = true

      // console.log(code)
      //
    }

    this.setSimShader(this._shader)

    gpuCompute.setVariableDependencies(posVar, [posVar])

    let error = gpuCompute.init()
    if (error !== null) {
      console.error(error)
    }

    this.getHeadList = () => {
      return gpuCompute.getCurrentRenderTarget(posVar).texture
    }
    this.getHeadList2 = () => {
      return gpuCompute.getAlternateRenderTarget(posVar).texture
    }

    this.core.onLoop((dt) => {
      gpuCompute.compute()
    })
  }
}

//

//

//
