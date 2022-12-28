import {
  Clock,
  Color,
  Object3D,
  PlaneBufferGeometry,
  ShaderMaterial,
  Vector3,
} from 'three'
import { GPUComputationRenderer } from 'three/examples/jsm/misc/GPUComputationRenderer.js'
import { Points } from 'three'
import { Core } from '@/helpers/Core'

export class Totem extends Object3D {
  constructor() {
    super()
    this.core = Core.makeDisposableNode({ name: 'flower' }).sub
    //

    function prepIndexer(texture, SIZE) {
      let pixels = texture.image.data
      let p = 0
      let max = SIZE * SIZE
      for (let j = 0; j < max; j++) {
        pixels[p + 0] = j
        pixels[p + 1] = j / max
        pixels[p + 2] = SIZE
        pixels[p + 3] = 1.0
        p += 4
      }
    }

    let ticker = 0
    let SIZE = 256

    let renderer = Core.now.canvas.now.gl

    let gpuCompute = new GPUComputationRenderer(SIZE, SIZE, renderer)

    let indexerTexture = gpuCompute.createTexture()
    prepIndexer(indexerTexture, SIZE)

    let pingTarget = gpuCompute.createRenderTarget()
    let pongTarget = gpuCompute.createRenderTarget()

    let pingMat, pongMat

    let displayV = `uniform sampler2D posTex;
uniform float pointSize;
uniform sampler2D indexerTexture;

varying vec2 vUv;

uniform float time;

void main() {
    vec4 info = texture2D(indexerTexture, uv);

    vec4 pos = texture2D(posTex, uv);

    vec4 mvPosition = modelViewMatrix * vec4(pos.xyz, 1.0);
    vec4 outputPos = projectionMatrix * mvPosition;

    // outputPos.y = outputPos.y + sin(outputPos.y + time * 50.0) * sin(outputPos.y + time * 50.0);
    // outputPos.x = outputPos.x + cos(outputPos.x + time * 50.0) * sin(outputPos.x + time * 50.0);

    vUv = uv;

    gl_Position = outputPos;
    gl_PointSize = pointSize;
}
`

    let displayF = `
uniform sampler2D posTex;

uniform sampler2D picture;
uniform float opacity;

uniform float time;

uniform vec3 colorPicker;

varying vec2 vUv;

void main() {
    vec4 posColor = texture2D(posTex, vUv);

    vec4 imgColor = texture2D(picture, vUv);

    vec4 outputColor = imgColor;
    outputColor.a = outputColor.a * opacity;

    // outputColor.xyz *= posColor.xyz;

    outputColor.rgb = mix(outputColor.rgb + 0.2, vec3(1.0), smoothstep(0.0, 1.0, abs(sin(time * 5.0))));

    gl_FragColor = vec4(normalize(posColor.rgb) * 0.5 + 0.5, opacity);
}
`
    let defaultPingPong = /* glsl */ `
    //
//THANK YOU for your support <3
//

#include <common>
precision highp sampler2D;

//
//  Classic Perlin 3D Noise
//  by Stefan Gustavson
//

vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec2 fade(vec2 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

float cnoise(vec2 P){
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x,gy.x);
  vec2 g10 = vec2(gx.y,gy.y);
  vec2 g01 = vec2(gx.z,gy.z);
  vec2 g11 = vec2(gx.w,gy.w);
  vec4 norm = 1.79284291400159 - 0.85373472095314 *
      vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}

#define M_PI 3.1415926535897932384626433832795
float atan2(in float y, in float x) {
  bool xgty = (abs(x) > abs(y));
  return mix(M_PI/2.0 - atan(x,y), atan(y,x), float(xgty));
}

vec3 ballify (vec3 pos, float r) {
  float az = atan2(pos.y, pos.x);
  float el = atan2(pos.z, sqrt(pos.x * pos.x + pos.y * pos.y));
  return vec3(
    r * cos(el) * cos(az),
    r * cos(el) * sin(az),
    r * sin(el)
  );
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


mat3 rotateZ(float rad) {
    float c = cos(rad);
    float s = sin(rad);
    return mat3(
        c, s, 0.0,
        -s, c, 0.0,
        0.0, 0.0, 1.0
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

mat3 rotateX(float rad) {
    float c = cos(rad);
    float s = sin(rad);
    return mat3(
        1.0, 0.0, 0.0,
        0.0, c, s,
        0.0, -s, c
    );
}

// float Gravity(float z) {
//   float G, eZ;
//   const float ER = 6378150.0;
//   const float ER2 = 6378150.0 * 6378150.0;
//   eZ = ER + z;
//   G = 9.81 * ER2 / (eZ * eZ);
//   return G;
// }

float constrain(float val, float min, float max) {
    if (val < min) {
        return min;
    } else if (val > max) {
        return max;
    } else {
        return val;
    }
}

vec3 getDiff (vec3 lastPos, vec3 mouse) {
  vec3 diff = lastPos.xyz - mouse;
  float distance = constrain(length(diff), 1.0, 5.0);
  float strength = 1.0 / (distance * distance);

  diff = normalize(diff);
  diff = diff * strength * -1.0;

  return diff;
}

vec3 resDiff (in vec3 lastPos, in vec3 mouse) {
  vec3 diff = lastPos - mouse;
  diff = normalize(diff) * -1.0;
  return diff;
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

uniform float time;
uniform sampler2D lastTexture;
uniform sampler2D indexerTexture;

uniform vec3 mouse;

 // Originally sourced from https://www.shadertoy.com/view/ldfSWs
      // Thank you Iñigo :)
      vec3 doBackground( void )
      {
          return vec3( 0.0, 0.0, 0.0);
      }
      float sdBox( vec3 p, vec3 b )
      {
        vec3 q = abs(p) - b;
        return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);
      }
      float sdTriPrism( vec3 p, vec2 h )
      {
        vec3 q = abs(p);
        return max(q.z-h.y,max(q.x*0.866025+p.y*0.5,-p.y)-h.x*0.5);
      }
      float sdVerticalCapsule( vec3 p, float h, float r )
      {
        p.y -= clamp( p.y, 0.0, h );
        return length( p ) - r;
      }
      float sdSphere( vec3 p, float s )
      {
        return length(p)-s;
      }
      float sdOctahedron( vec3 p, float s)
      {
        p = abs(p);
        float m = p.x+p.y+p.z-s;
        vec3 q;
            if( 3.0*p.x < m ) q = p.xyz;
        else if( 3.0*p.y < m ) q = p.yzx;
        else if( 3.0*p.z < m ) q = p.zxy;
        else return m*0.57735027;
        float k = clamp(0.5*(q.z-q.y+s),0.0,s);
        return length(vec3(q.x,q.y-s+k,q.z-k));
      }
      float sdTorus( vec3 p, vec2 t )
      {
        vec2 q = vec2(length(p.xz)-t.x,p.y);
        return length(q)-t.y;
      }
      float opExtrusion( in vec3 p, in float d, in float h )
      {
          vec2 w = vec2( d, abs(p.z) - h );
          return min(max(w.x,w.y),0.0) + length(max(w,0.0));
      }
      float opSmoothUnion( float d1, float d2, float k ) {
          float h = clamp( 0.5 + 0.5*(d2-d1)/k, 0.0, 1.0 );
          return mix( d2, d1, h ) - k*h*(1.0-h); }
      float opSmoothSubtraction( float d1, float d2, float k ) {
          float h = clamp( 0.5 - 0.5*(d2+d1)/k, 0.0, 1.0 );
          return mix( d2, -d1, h ) + k*h*(1.0-h); }
      float opSmoothIntersection( float d1, float d2, float k ) {
          float h = clamp( 0.5 - 0.5*(d2-d1)/k, 0.0, 1.0 );
          return mix( d2, d1, h ) + k*h*(1.0-h); }
      float opRound (float d1, float rounder) {
        return d1 - rounder;
      }
      vec3 opTwist( in vec3 p, in float k )
      {
          float c = cos(k*p.y);
          float s = sin(k*p.y);
          mat2  m = mat2(c,-s,s,c);
          vec3  q = vec3(m*p.xz,p.y);
          return (q);
      }
      //https://iquilezles.org/www/articles/distfunctions/distfunctions.htm
      float doModel(vec3 p) {
        float myTimer = time * 1.0;


        float d = 2.0;

        vec3 pp = opTwist(p, 1.0 * sin(time * 2.5));

        float ten = sdOctahedron(pp, 4.0);

        float star = opRound(ten, 0.8);

        d = opSmoothUnion(
          d,
          star,
          1.0
        );

        return d;
      }
      vec3 opRep( vec3 p, vec3 c )
      {
          return mod(p,c) - 0.5 * c;
      }
      vec3 calcNormal( in vec3 pos )
      {
          const float eps = 0.002;             // precision of the normal computation
          const vec3 v1 = vec3( 1.0,-1.0,-1.0);
          const vec3 v2 = vec3(-1.0,-1.0, 1.0);
          const vec3 v3 = vec3(-1.0, 1.0,-1.0);
          const vec3 v4 = vec3( 1.0, 1.0, 1.0);
        return normalize( v1*doModel( pos + v1*eps ) +
                  v2*doModel( pos + v2*eps ) +
                  v3*doModel( pos + v3*eps ) +
                  v4*doModel( pos + v4*eps ) );
      }

      float calcIntersection( in vec3 ro, in vec3 rd )
      {
        const int Scans = 5;
        const float maxd = 20.0;           // max trace distance
        // const float precis = 0.001;        // precission of the intersection
        const float precis = 0.001;        // precission of the intersection
        float h = precis*2.0;
        float t = 0.0;
        float res = -1.0;
        for( int i=0; i<Scans; i++ )          // max number of raymarching iterations is 90
        {
            if(h < precis || t > maxd) break;

            h = doModel( ro + rd * t );

            t += h;
        }
        if( abs(t) <= maxd ) {
          res = t;
        }
        return res;
      }

void main () {

  // @v@
  // @.@

  vec2 uv = gl_FragCoord.xy / resolution.xy;

  vec4 indexer = texture2D(indexerTexture, uv);
  vec4 lastPos = texture2D(lastTexture, uv);

  float i = indexer.x;
  float e = indexer.y;
  float u = indexer.z;

float x = rand(uv + 0.1) - 0.5;
float y = rand(uv + 0.2) - 0.5;
float z = rand(uv + 0.3) - 0.5;

  vec3 pos = vec3(lastPos * 2.5);

  pos.xyz = ballify(pos + vec3(x,y,z), 10.0);

// vec3 swing = vec3(0.0);
// swing.x = sin(time * 60.0);
// swing.y = cos(time * 60.0);


  vec3 rayOrigin = ballify(vec3(x,y,z), 10.0);

      vec3 rayDirection = normalize(-rayOrigin);
      float collision = calcIntersection(rayOrigin, rayDirection);
      vec3 nPosition = rayOrigin + rayDirection * collision;
      float useVertex = 1.0;

      if (length(nPosition) >= length(rayOrigin)) {
        useVertex = 0.0;
        nPosition = vec3(0.0);
      }

  // nPosition.xyz = rotateQ(normalize(vec3(1.0,0.0,1.0)), time * 1.0) * nPosition.xyz;
  lastPos.xyz = rotateQ(normalize(vec3(0.0, 0.0, 1.0)), time * 0.0) * nPosition.xyz;
  lastPos.xyz = rotateQ(normalize(vec3(0.0, 1.0, 0.0)), time * 1.0) * lastPos.xyz;

  // remix code end here//
  gl_FragColor = vec4(lastPos.xyz * 2., 1.0);



}




`

    let mouseV3 = new Vector3(0.0, 0.0, 0.0)

    let initShader = ({ pingPongShader }) => {
      try {
        let newPingMat = gpuCompute.createShaderMaterial(pingPongShader, {
          lastTexture: { value: null },
          indexerTexture: { value: indexerTexture },
          time: { value: 0 },
          mouse: { value: mouseV3 },
        })
        let newPongMat = gpuCompute.createShaderMaterial(pingPongShader, {
          lastTexture: { value: null },
          indexerTexture: { value: indexerTexture },
          time: { value: 0 },
          mouse: { value: mouseV3 },
        })
        pingMat = newPingMat
        pongMat = newPongMat
      } catch (e) {
        console.error(e)
      }
    }

    initShader({ pingPongShader: defaultPingPong })

    this.core.onLoop(() => {
      pingMat.uniforms.mouse.value.copy({
        x: 0, //Core.now.canvas.now.mouse.x,
        y: 0, //Core.now.canvas.now.mouse.y,
        z: 0,
      })
      pongMat.uniforms.mouse.value.copy({
        x: 0, //Core.now.canvas.now.mouse.x,
        y: 0, //Core.now.canvas.now.mouse.y,
        z: 0,
      })
    })

    // sim part
    let procSim = (time) => {
      pingMat.uniforms.lastTexture.value = pongTarget.texture
      pongMat.uniforms.lastTexture.value = pingTarget.texture

      pingMat.uniforms.time.value = time || window.performance.now() / 1000
      pongMat.uniforms.time.value = time || window.performance.now() / 1000

      if (ticker % 2 === 0) {
        gpuCompute.doRenderTarget(pongMat, pongTarget)
      } else {
        gpuCompute.doRenderTarget(pingMat, pingTarget)
      }
    }

    // display part
    let geometry = new PlaneBufferGeometry(1.0, 1.0, SIZE - 1, SIZE - 1)
    let material = new ShaderMaterial({
      // blending: AdditiveBlending,
      // depthTest: false,
      transparent: true,
      depthWrite: true,
      vertexShader: displayV,
      fragmentShader: displayF,
      defines: {
        resolution: 'vec2( ' + SIZE.toFixed(1) + ', ' + SIZE.toFixed(1) + ' )',
      },
      uniforms: {
        time: { value: 0 },
        opacity: { value: 0.5 },
        posTex: { value: null },

        colorPicker: { value: new Color('#000000') },
        indexerTexture: { value: indexerTexture },

        picture: {
          value: null,
          //  new TextureLoader().load(
          //   'https://picsum.photos/g/128?image=1081',
          //   (texture) => {
          //     texture.needsUpdate = true
          //   }
          // ),
        },
        pointSize: { value: 1.0 },
      },
    })

    let points = new Points(geometry, material)
    points.frustumCulled = false

    this.add(points)

    this.core.onClean(() => {
      points.removeFromParent()
    })
    let clock = new Clock()

    let rAF = () => {
      let t = clock.getElapsedTime()
      procSim(t)
      if (ticker % 2 === 0) {
        material.uniforms.posTex.value = pongTarget.texture
      } else {
        material.uniforms.posTex.value = pingTarget.texture
      }
      ticker++

      material.uniforms.time.value = t
    }

    this.core.onLoop(() => {
      rAF()
    })
  }
}
