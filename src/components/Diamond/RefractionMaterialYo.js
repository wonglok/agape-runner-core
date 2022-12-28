// Original by N8Programs
// https://twitter.com/N8Programs/status/1569865007042646018
// https://github.com/N8python/diamonds

import * as THREE from 'three'
import { useLayoutEffect, useMemo, useRef } from 'react'
import { extend, useThree } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import {
  MeshBVH,
  MeshBVHUniformStruct,
  shaderStructs,
  shaderIntersectFunction,
  SAH,
} from 'three-mesh-bvh'
import { generateUUID } from 'three/src/math/MathUtils'

const DiamondMaterial = shaderMaterial(
  {
    envMap: null,
    bounces: 3,
    ior: 2.4,
    correctMips: true,
    aberrationStrength: 0.01,
    fastChroma: true,
    fresnel: 0,
    bvh: new MeshBVHUniformStruct(),
    color: new THREE.Color('white'),
    resolution: new THREE.Vector2(),
    offsets: null,
    normals: null,
    progress: 0.0,
  },
  /*glsl*/ `
  varying vec3 vWorldPosition;
  varying vec3 vNormal;
  varying mat4 projectionMatrixInv;
  varying mat4 viewMatrixInv;
  varying vec3 viewDirection;

  uniform float progress;
  uniform sampler2D offsets;
  uniform sampler2D normals;
  attribute vec2 uv2;

  void main() {
    vec4 normalsData = texture2D(normals,vec2(uv2.x, 1.0 - progress));
    vec4 offsetsData = texture2D(offsets,vec2(uv2.x, 1.0 - progress));

    projectionMatrixInv = inverse(projectionMatrix);
    viewMatrixInv = inverse(viewMatrix);
    vWorldPosition = (modelMatrix * vec4(position + offsetsData.xzy, 1.0)).xyz;
    vNormal = (viewMatrixInv * vec4(normalsData.xzy, 0.0)).xyz;
    // vNormal = (viewMatrixInv * vec4(normalMatrix * normalsData.xzy, 0.0)).xyz;
    viewDirection = normalize(vWorldPosition - cameraPosition);
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position + offsetsData.xzy, 1.0);
  }`,
  /*glsl*/ `
  precision highp isampler2D;
  precision highp usampler2D;
  varying vec3 vWorldPosition;
  varying vec3 vNormal;
  uniform samplerCube envMap;
  uniform float bounces;
  ${shaderStructs}
  ${shaderIntersectFunction}
  uniform BVH bvh;
  uniform float ior;
  uniform vec3 color;
  uniform bool correctMips;
  uniform vec2 resolution;
  uniform float fresnel;
  uniform float aberrationStrength;
  uniform mat4 modelMatrix;
  uniform bool fastChroma;
  varying mat4 projectionMatrixInv;
  varying mat4 viewMatrixInv;
  varying vec3 viewDirection;

  float fresnelFunc(vec3 viewDirection, vec3 worldNormal) {
    return pow( 1.0 + dot( viewDirection, worldNormal), 10.0 );
  }

  vec3 totalInternalReflection(vec3 ro, vec3 rd, vec3 normal, float ior, mat4 modelMatrixInverse) {
  vec3 rayOrigin = ro;
  vec3 rayDirection = rd;
  rayDirection = refract(rayDirection, normal, 1.0 / ior);
  rayOrigin = vWorldPosition + rayDirection * 0.001;
  rayOrigin = (modelMatrixInverse * vec4(rayOrigin, 1.0)).xyz;
  rayDirection = normalize((modelMatrixInverse * vec4(rayDirection, 0.0)).xyz);
  for(float i = 0.0; i < bounces; i++) {
      uvec4 faceIndices = uvec4( 0u );
      vec3 faceNormal = vec3( 0.0, 0.0, 1.0 );
      vec3 barycoord = vec3( 0.0 );
      float side = 1.0;
      float dist = 0.0;
      bvhIntersectFirstHit( bvh, rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist );
      vec3 hitPos = rayOrigin + rayDirection * max(dist - 0.001, 0.0);
      // faceNormal *= side;
      vec3 tempDir = refract(rayDirection, faceNormal, ior);
      if (length(tempDir) != 0.0) {
          rayDirection = tempDir;
          break;
      }
      rayDirection = reflect(rayDirection, faceNormal);
      rayOrigin = hitPos + rayDirection * 0.01;
    }
    rayDirection = normalize((modelMatrix * vec4(rayDirection, 0.0)).xyz);
    return rayDirection;
  }

  void main() {
    mat4 modelMatrixInverse = inverse(modelMatrix);
    vec2 uv = gl_FragCoord.xy / resolution;
    vec3 directionCamPerfect = (projectionMatrixInv * vec4(uv * 2.0 - 1.0, 0.0, 1.0)).xyz;
    directionCamPerfect = (viewMatrixInv * vec4(directionCamPerfect, 0.0)).xyz;
    directionCamPerfect = normalize(directionCamPerfect);
    vec3 normal = vNormal;
    vec3 rayOrigin = vec3(cameraPosition);
    vec3 rayDirection = normalize(vWorldPosition - cameraPosition);
    vec3 finalColor;
    #ifdef CHROMATIC_ABERRATIONS
      //vec3 rayDirectionR = totalInternalReflection(rayOrigin, rayDirection, normal, max(ior * (1.0 - aberrationStrength), 1.0), modelMatrixInverse);
      vec3 rayDirectionG = totalInternalReflection(rayOrigin, rayDirection, normal, max(ior, 1.0), modelMatrixInverse);
      //vec3 rayDirectionB = totalInternalReflection(rayOrigin, rayDirection, normal, max(ior * (1.0 + aberrationStrength), 1.0), modelMatrixInverse);
      vec3 rayDirectionR = normalize(rayDirectionG + 2.0 * vec3(aberrationStrength));
      vec3 rayDirectionB = normalize(rayDirectionG - 2.0 * vec3(aberrationStrength));
      if (!fastChroma) {
        rayDirectionR = totalInternalReflection(rayOrigin, rayDirection, normal, max(ior * (1.0 - aberrationStrength), 1.0), modelMatrixInverse);
        rayDirectionB = totalInternalReflection(rayOrigin, rayDirection, normal, max(ior * (1.0 + aberrationStrength), 1.0), modelMatrixInverse);
      }
      float finalColorR = textureGrad(envMap, rayDirectionR, dFdx(correctMips ? directionCamPerfect: rayDirection), dFdy(correctMips ? directionCamPerfect: rayDirection)).r;
      float finalColorG = textureGrad(envMap, rayDirectionG, dFdx(correctMips ? directionCamPerfect: rayDirection), dFdy(correctMips ? directionCamPerfect: rayDirection)).g;
      float finalColorB = textureGrad(envMap, rayDirectionB, dFdx(correctMips ? directionCamPerfect: rayDirection), dFdy(correctMips ? directionCamPerfect: rayDirection)).b;
      finalColor = vec3(finalColorR, finalColorG, finalColorB) * color;
    #else
      rayDirection = totalInternalReflection(rayOrigin, rayDirection, normal, max(ior, 1.0), modelMatrixInverse);
      finalColor = textureGrad(envMap, rayDirection, dFdx(correctMips ? directionCamPerfect: rayDirection), dFdy(correctMips ? directionCamPerfect: rayDirection)).rgb;
      finalColor *= color;
    #endif
    float nFresnel = fresnelFunc(viewDirection, normal * (1.0 - fresnel));
    gl_FragColor = vec4(mix(finalColor, vec3(1.0), nFresnel), 1.0);

    #include <tonemapping_fragment>
    #include <encodings_fragment>
  }`
)

extend({ DiamondMaterial })

DiamondMaterial.key = generateUUID()

export function RefractionMaterialYo({
  frames = 1,
  resolution = 256,
  near = 0.1,
  far = 1000,
  aberrationStrength = 0,
  key2 = generateUUID(),
  ...props
}) {
  const material = useRef()
  const { size } = useThree()
  const defines = useMemo(() => {
    const temp = {}
    if (aberrationStrength > 0) temp.CHROMATIC_ABERRATIONS = ''
    return temp
  }, [aberrationStrength])

  useLayoutEffect(() => {
    const geometry = material.current?.__r3f?.parent?.geometry
    if (geometry)
      material.current.bvh.updateFrom(
        new MeshBVH(geometry.toNonIndexed(), {
          lazyGeneration: false,
          strategy: SAH,
        })
      )
  }, [])

  return (
    <diamondMaterial
      key={JSON.stringify(!!aberrationStrength + key2 + DiamondMaterial.key)}
      defines={defines}
      ref={material}
      resolution={[size.width, size.height]}
      aberrationStrength={aberrationStrength}
      {...props}
    />
  )
}
