import { Environment, OrbitControls, Text, useGLTF } from '@react-three/drei'
import { Canvas, useLoader, useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { Suspense } from 'react'
import { Color, sRGBEncoding } from 'three'
import { EXRLoader } from 'three-stdlib'
import {
  Clock,
  DoubleSide,
  LinearEncoding,
  MeshPhysicalMaterial,
  ShaderMaterial,
} from 'three140'

export default function Viseme() {
  return (
    <div className='w-full h-full bg-white'>
      <Canvas
        style={{
          backgroundColor: 'white',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        onCreated={(st) => {
          st.scene.background = new Color('#ffffff')
          st.gl.physicallyCorrectLights = true
          st.gl.outputEncoding = sRGBEncoding
        }}
      >
        <Suspense fallback={<Text>Loading</Text>}>
          <Content></Content>
        </Suspense>

        <Environment background preset='apartment'></Environment>
        <OrbitControls
          object-position={[
            -0.938944768727402, 5.422066540446001, -3.571254399471269,
          ]}
        ></OrbitControls>
        {/*  */}
        {/* <gridHelper args={[100, 100, 0xff0000, 0xffff00]}></gridHelper> */}
        {/* <OverlayContentAdapter></OverlayContentAdapter> */}
      </Canvas>
    </div>
  )
}
/* */

function Content() {
  let glb = useGLTF(`/vat/bricks/rigid.glb`)
  let offsets = useLoader(EXRLoader, `/vat/bricks/offsets.001.exr`)
  let normals = useLoader(EXRLoader, `/vat/bricks/normals.001.exr`)

  useEffect(() => {
    let clears = []
    offsets.generateMipmaps = true
    normals.generateMipmaps = false
    //

    glb.scene.traverse((it) => {
      if (it.geometry) {
        let tasks = []
        let onLoop = (v) => tasks.push(v)

        it.material = getMat(onLoop, normals, offsets)

        let tt

        let hh = () => {
          tt = requestAnimationFrame(hh)
          tasks.forEach((t) => t())
        }
        tt = requestAnimationFrame(hh)

        clears.push(() => {
          cancelAnimationFrame(tt)
        })
      }
    })

    return () => {
      clears.forEach((e) => e())
    }
  }, [])
  return (
    <group>
      <primitive object={glb.scene}></primitive>
    </group>
  )
}
let getMat = (onLoop, normals, offsets) => {
  let matt = new MeshPhysicalMaterial({
    color: new Color('#00ffff'),
    transparent: true,
    roughness: 0.0,
    metalness: 0.5,
    side: DoubleSide,
    reflectivity: 0.5,
    transmission: 1.0,
    flatShading: true,
    ior: 1.5,
    thickness: 5,
  })

  //

  matt.onBeforeCompile = (shader, gl) => {
    shader.uniforms.time = { value: null }

    let clock = new Clock()
    onLoop(() => {
      // let time = window.performance.now() / 1000
      // shader.uniforms.time.value = time

      let dt = clock.getDelta()
      shader.uniforms.progress.value += (1 / 250) * 24 * dt

      if (shader.uniforms.progress.value > 1) {
        shader.uniforms.progress.value = 0
      }
    })

    shader.uniforms.offsetsTex = { value: offsets }
    shader.uniforms.normalsTex = { value: normals }
    shader.uniforms.progress = { value: 0 }

    shader.vertexShader = shader.vertexShader.replace(
      `void main() {`,
      /* glsl */ `
        uniform sampler2D offsetsTex;
        uniform sampler2D normalsTex;
        uniform float progress;

        varying vec3 vNormals;
        attribute vec2 uv2;

        uniform float time;

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
        mat3 calcLookAtMatrix(vec3 origin, vec3 target, float roll) {
          vec3 rr = vec3(sin(roll), cos(roll), 0.0);
          vec3 ww = normalize(target - origin);
          vec3 uu = normalize(cross(ww, rr));
          vec3 vv = normalize(cross(uu, ww));
          return mat3(uu, vv, ww);
        }


        void main() {`
    )
    //

    shader.vertexShader = shader.vertexShader.replace(
      `#include <begin_vertex>`,
      /* glsl */ `
          vec4 offsetData = texture2D(offsetsTex,vec2(uv2.x, 1.0 - progress));
          vec3 transformed = vec3( position + offsetData.xzy );
        `
    )

    shader.vertexShader = shader.vertexShader.replace(
      `#include <beginnormal_vertex>`,
      /* glsl */ `
          // vec3 nPosNormal = normalize(normal);

          // vec4 tt2 = texture2D(tPos, uvinfo.xy);
          // vec3 tn2 = normalize(tt2.rgb);

          // nPosNormal = rotateX(tn2.r * 3.1415) * nPosNormal;
          // nPosNormal = rotateY(tn2.g * 3.1415) * nPosNormal;
          // nPosNormal = rotateZ(tn2.b * 3.1415) * nPosNormal;

            vec4 normalsData = texture2D(normalsTex,vec2(uv2.x, 1.0 - progress));


          vec3 objectNormal = normalize(vec3( normal + normalsData.xzy ));

          // #ifdef USE_TANGENT
          //   vec3 objectTangent = vec3( tangent.xyz );
          // #endif
          `
    )
    shader.fragmentShader = shader.fragmentShader.replace(
      `void main() {`,
      `${`
          // headers //
        `}\nvoid main() {`
    )
    shader.fragmentShader = shader.fragmentShader.replace(
      `#include <output_fragment>`,
      `
        #ifdef OPAQUE
          diffuseColor.a = 1.0;
        #endif
        #ifdef USE_TRANSMISSION
          diffuseColor.a *= transmissionAlpha + 0.1;
        #endif
        gl_FragColor = vec4( outgoingLight, diffuseColor.a );
        `
    )
  }
  return matt
}

// let a = /* glsl */ `
//   vec4 packFloatToVec4i(const float value) {
//     const vec4 bitSh = vec4(256.0*256.0*256.0, 256.0*256.0, 256.0, 1.0);
//     const vec4 bitMsk = vec4(0.0, 1.0/256.0, 1.0/256.0, 1.0/256.0);
//     vec4 res = fract(value * bitSh);
//     res -= res.xxyz * bitMsk;
//     return res;
//   }

//   float unpackFloatFromVec4i(const vec4 value) {
//     const vec4 bitSh = vec4(1.0/(256.0*256.0*256.0), 1.0/(256.0*256.0), 1.0/256.0, 1.0);
//     return (dot(value, bitSh));
//   }

//

//   float3 tex1 = tex2Dlod (_AnimVertexTex1, texCoords);
// float3 tex2 = tex2Dlod (_AnimVertexTex2, texCoords);
// float positionX = DecodeFloatRG (tex1.rg);
// float positionY = DecodeFloatRG (float2 (tex1.b, tex2.r));
// float positionZ = DecodeFloatRG (tex2.gb);
// float3 position = float3 (positionX, positionY, positionZ);
// `
