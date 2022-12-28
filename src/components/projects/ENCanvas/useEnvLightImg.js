import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo } from 'react'

import {
  WebGLCubeRenderTarget,
  Scene,
  Mesh,
  ShaderMaterial,
  CubeRefractionMapping,
  BackSide,
  NoBlending,
  BoxBufferGeometry,
  CubeCamera,
  // LinearMipmapLinearFilter,
  // RGBFormat,
  // LinearFilter,
  CubeReflectionMapping,
  sRGBEncoding,
  RGBAFormat,
  NearestFilter,
  NearestMipmapLinearFilter,
} from 'three'

// import { cloneUniforms } from "three/src/renderers/shaders/UniformsUtils.js";
// import * as dat from '';

let DefaultCode = `
const mat2 m = mat2( 0.80,  0.60, -0.60,  0.80 );

float noise( in vec2 p ) {
  return sin(p.x)*sin(p.y);
}

float fbm4( vec2 p ) {
    float f = 0.0;
    f += 0.5000 * noise( p ); p = m * p * 2.02;
    f += 0.2500 * noise( p ); p = m * p * 2.03;
    f += 0.1250 * noise( p ); p = m * p * 2.01;
    f += 0.0625 * noise( p );
    return f / 0.9375;
}

float fbm6( vec2 p ) {
    float f = 0.0;
    f += 0.500000*(0.5 + 0.5 * noise( p )); p = m*p*2.02;
    f += 0.250000*(0.5 + 0.5 * noise( p )); p = m*p*2.03;
    f += 0.125000*(0.5 + 0.5 * noise( p )); p = m*p*2.01;
    f += 0.062500*(0.5 + 0.5 * noise( p )); p = m*p*2.04;
    f += 0.031250*(0.5 + 0.5 * noise( p )); p = m*p*2.01;
    f += 0.015625*(0.5 + 0.5 * noise( p ));
    return f/0.96875;
}

float pattern (vec2 p) {
  float vout = fbm4( p + time + fbm6(  p + fbm4( p + time )) );
  return abs(vout);
}

vec4 mainImage (vec2 uv, vec3 direction, vec3 pos)  {
  return vec4(vec3(
    0.35 + pattern(uv * 1.70123 + -0.17 * cos(time * 0.05)),
    0.35 + pattern(uv * 1.70123 +  0.0 * cos(time * 0.05)),
    0.35 + pattern(uv * 1.70123 +  0.17 * cos(time * 0.05))
  ), 1.0);
}
`

export function useComputeEnvMap(
  code = DefaultCode,
  uniforms = {},
  res = 128,
  doCompute = true
) {
  let { gl } = useThree()

  let { envMap, compute, cubeRtt } = useMemo(() => {
    // console.info('uniforms:', uniforms)

    let scene = new Scene()

    let shader = {
      uniforms: {
        rotY: { value: 0 },
        time: { value: 0.5 },
        ...uniforms,
      },

      vertexShader: `
        varying vec3 vPos;
        varying vec3 vWorldDirection;
        vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
          return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
        }
        void main() {
          vPos = position;
          vWorldDirection = transformDirection( position, modelMatrix );
          #include <begin_vertex>
          #include <project_vertex>
        }
      `,

      fragmentShader: `
        varying vec3 vWorldDirection;
        varying vec3 vPos;
        #define RECIPROCAL_PI 0.31830988618
        #define RECIPROCAL_PI2 0.15915494

        uniform float time;
        uniform float rotY;

        mat3 rotateY(float rad) {
            float c = cos(rad);
            float s = sin(rad);
            return mat3(
                c, 0.0, -s,
                0.0, 1.0, 0.0,
                s, 0.0, c
            );
        }

        ${code || DefaultCode}

        void main() {
          vec3 direction = normalize( vWorldDirection * rotateY(rotY)  );
          vec2 sampleUV;
          sampleUV.y = asin( clamp( direction.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
          sampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;

          gl_FragColor = mainImage(sampleUV, direction, vPos);

        }
      `,
    }

    let material = new ShaderMaterial({
      type: 'CubemapFromEquirect',
      uniforms: shader.uniforms,
      vertexShader: shader.vertexShader,
      fragmentShader: shader.fragmentShader,
      side: BackSide,
      blending: NoBlending,
    })

    let mesh = new Mesh(new BoxBufferGeometry(5, 5, 5), material)
    scene.add(mesh)

    let cubeRtt = new WebGLCubeRenderTarget(res, {
      format: RGBAFormat,
      generateMipmaps: true,
      magFilter: NearestFilter,
      minFilter: NearestMipmapLinearFilter,
    })

    let camera = new CubeCamera(1, 100000, cubeRtt)

    shader.uniforms.time.value = 0.4
    camera.update(gl, scene)

    let compute = () => {
      shader.uniforms.time.value += 1 / 60
      camera.update(gl, scene)
    }

    cubeRtt.texture.mapping = CubeRefractionMapping
    cubeRtt.texture.mapping = CubeReflectionMapping
    cubeRtt.texture.encoding = sRGBEncoding

    return {
      cubeRtt,
      envMap: cubeRtt.texture,
      compute,
    }
  }, [code, gl, res, uniforms])

  useEffect(() => {
    return () => {
      cubeRtt.dispose()
    }
  }, [cubeRtt])

  useFrame(() => {
    if (doCompute) {
      compute()
    }
  })

  return { envMap }
}

//

// /*

//   let { envMap } = useEnvLightImg({
//     // img: `/image/cocacola3.png`,
//     mode: colorMode,
//     images: [
//       //
//       `/hdri-jpg/blackwhite.jpg`,
//       `/hdri-jpg/lines.jpg`,
//       `/hdri-jpg/purple.jpg`,
//       `/hdri-jpg/cocacola3.png`,
//     ],
//   })

// */

// import { useTexture } from '@react-three/drei'
// import { useThree } from '@react-three/fiber'
// import { Color, RepeatWrapping, sRGBEncoding } from 'three'
// import { useTweaks } from 'use-tweaks'

// export function useEnvLightImg({ img = `/hdri/lok.png`, mode, images }) {
//   let { get } = useThree()
//   // let tex = useTexture(img)

//   let tex0 = useTexture(images[0])
//   let tex1 = useTexture(images[1])
//   let tex2 = useTexture(images[2])
//   let tex3 = useTexture(images[3])

//   tex0.encoding = sRGBEncoding
//   tex1.encoding = sRGBEncoding
//   tex2.encoding = sRGBEncoding
//   tex3.encoding = sRGBEncoding

//   //
//   tex0.wrapS = RepeatWrapping
//   tex0.wrapT = RepeatWrapping
//   tex1.wrapS = RepeatWrapping
//   tex1.wrapT = RepeatWrapping
//   tex2.wrapS = RepeatWrapping
//   tex2.wrapT = RepeatWrapping
//   tex3.wrapS = RepeatWrapping
//   tex3.wrapT = RepeatWrapping

//   let aggre = {
//     tex0,
//     tex1,
//     tex2,
//     tex3,
//   }

//   // let { current } = useTweaks({
//   //   options: [
//   //     { value: tex0, text: '1' },
//   //     { value: tex1, text: '2' },
//   //     { value: tex2, text: '3' },
//   //   ],
//   // })
//   // textures.current = current
//   let mm = useMemo(() => {
//     return new Vector2(0.8, -0.15)
//   }, [])

//   let color = useMemo(() => {
//     return new Color(PARAMS.marchingColor0)
//   }, [])

//   let {
//     doCompute,
//     envMapMode,
//     offsetX,
//     offsetY,
//     contrast,
//     lightness,
//     rotationXSpeed,
//     rotationYSpeed,
//   } = useTweaks('Env Map', {
//     ...makeFolder(
//       'Opts',
//       {
//         doCompute: true,
//         //
//         contrast: {
//           value: 1,
//           min: -3,
//           max: 3,
//           step: 0.01,
//         },
//         lightness: {
//           value: 0,
//           min: -3,
//           max: 3,
//           step: 0.01,
//         },

//         rotationXSpeed: {
//           value: 0.13,
//           min: -3,
//           max: 3,
//           step: 0.01,
//         },
//         rotationYSpeed: {
//           value: 0,
//           min: -3,
//           max: 3,
//           step: 0.01,
//         },
//         //
//         offsetX: {
//           value: 0,
//           min: -1,
//           max: 1,
//           step: 0.01,
//         },
//         offsetY: {
//           value: 0.5,
//           min: -1,
//           max: 1,
//           step: 0.01,
//         },
//         envMapMode: {
//           value: 'tex0',
//           options: {
//             tex0: 'tex0',
//             tex1: 'tex1',
//             tex2: 'tex2',
//             tex3: 'tex3',
//           },
//         },
//       },
//       false
//     ),
//   })

//   if (mode === 'light') {
//     envMapMode = 'tex1'
//     lightness = 0
//   } else if (mode === 'dark') {
//     envMapMode = 'tex2'
//     lightness = 0.13
//   }

//   let offset = useMemo(() => {
//     return new Vector2(0, 0)
//   }, [])
//   offset.x = offsetX
//   offset.y = offsetY

//   let rotation = useMemo(() => {
//     return new Vector2(0, 0)
//   }, [])
//   rotation.x = rotationXSpeed
//   rotation.y = rotationYSpeed

//   //
//   let chosenEnv = useMemo(() => {
//     return { value: aggre[envMapMode] }
//   }, [])

//   chosenEnv.value = aggre[envMapMode]
//   get().scene.environment = aggre[envMapMode]

//   //
//   let envMap = useComputeEnvMap(
//     /* glsl */ `
//     const float PI = 3.14159265;
//     const float SCALE = 1.0;
//     const mat3 m = mat3(
//       cos(PI * SCALE), -sin(PI * SCALE), 0.0,
//       sin(PI * SCALE),  cos(PI * SCALE), 0.0,
//       0.0,  0.0, 1.0
//     );
//     float noise( in vec3 p ) {
//       return cos(p.x) * sin(p.y) * cos(p.z);
//     }
//     float fbm4( vec3 p ) {
//         float f = 0.0;
//         f += 0.5000 * noise( p ); p = m * p * 2.02;
//         f += 0.2500 * noise( p ); p = m * p * 2.03;
//         f += 0.1250 * noise( p ); p = m * p * 2.01;
//         f += 0.0625 * noise( p );
//         return f / 0.9375;
//     }
//     float fbm6( vec3 p ) {
//         float f = 0.0;
//         f += 0.500000*(0.5 + 0.5 * noise( p )); p = m*p*2.02;
//         f += 0.250000*(0.5 + 0.5 * noise( p )); p = m*p*2.03;
//         f += 0.125000*(0.5 + 0.5 * noise( p )); p = m*p*2.01;
//         f += 0.062500*(0.5 + 0.5 * noise( p )); p = m*p*2.04;
//         f += 0.031250*(0.5 + 0.5 * noise( p )); p = m*p*2.01;
//         f += 0.015625*(0.5 + 0.5 * noise( p ));
//         return f/0.96875;
//     }
//     float pattern (vec3 p) {
//       float vout = fbm4( p + time + fbm6(  p + fbm4( p + time )) );
//       return abs(vout);
//     }
//     uniform sampler2D myTexture;
//     uniform vec2 offset;
//     uniform vec2 mouse;
//     uniform vec2 rotation;
//     uniform vec3 baseColor;
//     uniform float contrast;
//     uniform float lightness;
//     vec4 mainImage (vec2 uv, vec3 direction, vec3 pos) {

//       //
//       //
//       //
//       // vec2(direction.x, direction.y) * 0.35 + vec2(sin(mouse.x * 2.0 + time * 1.0), uv.y)
//       vec4 tColor = texture2D(myTexture, mod(vec2(uv.x + (offset.x + sin(time * rotation.x)) , uv.y + (offset.y + sin(time * rotation.y))) , vec2(1.0)));

//       tColor.r = pow(tColor.r, contrast);
//       tColor.g = pow(tColor.g, contrast);
//       tColor.b = pow(tColor.b, contrast);

//       tColor.r += (lightness);
//       tColor.g += (lightness);
//       tColor.b += (lightness);

//       // tColor.rgb += vec3(
//       //   pow(pattern(direction.xyz + -0.15 * 0.0 * cos(time * 0.1)), 0.1),
//       //   pow(pattern(direction.xyz +   0.0 * cos(time * 0.1)), 0.1),
//       //   pow(pattern(direction.xyz +  0.15 * 0.0 * cos(time * 0.1)), 0.1)
//       // );
//       return vec4(tColor.rgb, 1.0);
//     }
//   `.trim(),
//     {
//       baseColor: { value: color },
//       offset: { value: offset },
//       mouse: { value: mm },
//       myTexture: chosenEnv,

//       idx: { value: 0 },

//       rotation: { value: rotation },
//       contrast: { value: contrast },
//       lightness: { value: lightness },
//       //
//     },
//     64,
//     doCompute
//   )

//   // useFrame(() => {
//   //   color.set(PARAMS.marchingColor0)
//   //   let mouse = get().mouse
//   //   mm.lerp(mouse, 0.05)
//   // })

//   // useEffect(() => {
//   //   let { scene } = get()
//   //   envMap.encoding = sRGBEncoding
//   //   scene.environment = envMap
//   //   envMap.mapping = CubeReflectionMapping
//   //   return () => {
//   //     scene.environment = null
//   //   }
//   // }, [envMap, get])

//   return { envMap }
// }
