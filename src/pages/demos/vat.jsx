import { OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas, useLoader, useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { Suspense } from 'react'
import { Color, sRGBEncoding } from 'three'
import { EXRLoader } from 'three-stdlib'
import { Clock, DoubleSide, LinearEncoding, ShaderMaterial } from 'three140'

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
        <Suspense fallback={null}>
          <Content></Content>
        </Suspense>
        <OrbitControls></OrbitControls>
        <gridHelper args={[100, 100, 0xff0000, 0xffff00]}></gridHelper>
        {/* <OverlayContentAdapter></OverlayContentAdapter> */}
      </Canvas>
    </div>
  )
}

function Content() {
  let glb = useGLTF(`/vat/cloth3/vat_works.glb`)
  let offsets = useLoader(EXRLoader, `/vat/cloth3/offsets.exr`)
  let normals = useLoader(EXRLoader, `/vat/cloth3/normals.exr`)

  useEffect(() => {
    let clears = []
    offsets.generateMipmaps = true
    normals.generateMipmaps = true
    //
    glb.scene.traverse((it) => {
      if (it.geometry) {
        it.material = new ShaderMaterial({
          uniforms: {
            offsetsTex: { value: offsets },
            normalsTex: { value: normals },
            progress: { value: 0 },
          },
          side: DoubleSide,
          vertexShader: `
            uniform sampler2D offsetsTex;
            uniform sampler2D normalsTex;
            uniform float progress;

            varying vec3 vNormals;
            attribute vec2 uv2;
            void main (void) {
              vec4 offsetData = texture2D(offsetsTex,vec2(uv2.x, 1.0 - progress));
              vec4 normalsData = texture2D(normalsTex,vec2(uv2.x, 1.0 - progress));

              vNormals = normalMatrix * (normalsData.xzy);
              gl_Position = projectionMatrix * modelViewMatrix * (vec4(position + offsetData.xzy, 1.0));
            }
          `,
          fragmentShader: `
            varying vec3 vNormals;
            void main (void) {
                gl_FragColor = vec4(vNormals, 1.0);
            }
          `,
        })

        let tt
        let clock = new Clock()
        let hh = () => {
          let dt = clock.getDelta()
          tt = requestAnimationFrame(hh)
          it.material.uniforms.progress.value += (dt / 250) * 60 * 0.25

          if (it.material.uniforms.progress.value > 1) {
            it.material.uniforms.progress.value = 0
          }
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
