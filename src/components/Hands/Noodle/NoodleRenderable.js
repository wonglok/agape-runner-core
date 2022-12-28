// import { GPUComputationRenderer } from 'three-stdlib'
import {
  // Vector3,
  // BufferAttribute,
  // InstancedBufferAttribute,
  // InstancedBufferGeometry,
  // Vector2,
  // RepeatWrapping,
  Mesh,
  Object3D,
  Color,
  // IcosahedronBufferGeometry,
  // FrontSide,
  // FloatType,
  DoubleSide,
} from 'three'
import { MeshPhysicalMaterial } from 'three'
// import { Core } from '@/vfx-core/Core'
import { NoodleGeo } from './NoodleGeo'
// import { MeshBasicMaterial } from 'three140'

//tunnelThickness
export class NoodleRenderable {
  constructor({ node, sim, howManyTracker, howLongTail, renderConfig = {} }) {
    this.renderConfig = renderConfig
    this.howManyTracker = howManyTracker
    this.howLongTail = howLongTail
    this.o3d = new Object3D()
    this.node = node
    this.sim = sim
    this.wait = this.setup({ node })
  }
  async setup({ node }) {
    //
    let self = this

    let { geometry, ballGeo, subdivisions, count } = new NoodleGeo({
      count: this.howManyTracker,
      numSides: 4,
      subdivisions: this.howLongTail,
      openEnded: false,
    })

    geometry.instanceCount = count

    let matConfig = {
      color: new Color('#ff0000'),
      transparent: true,
      roughness: 0.0,
      metalness: 1.0,
      side: DoubleSide,
      reflectivity: 0.5,
      transmission: 0.0,
      ior: 1.25,
      ...this.renderConfig,
    }

    let matLine1 = new MeshPhysicalMaterial({
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

    //

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
        //

        vec4 color = texture2D(posTexture,
          vec2(
            t,
            (lineIDXER) / ${this.sim.howManyTracker.toFixed(2)}
          )
        );

        return color.rgb;
      }

      vec3 sampleLine (float t) {
        vec3 pt = vec3(0.0);

        float lineIDXER = offset.w;
        pt += getP3OfTex(t, lineIDXER);

        return pt;
      }

      varying vec3 vSize;

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

        vSize = cur;
      }

      varying float vT;

      vec3 makeGeo () {
        float t = (tubeInfo) + 0.5;
        float thickness = 200.0 *  0.01 * (1.0 - t);

        vT = t;

        vec2 volume = vec2(thickness);
        vec3 transformedYo;
        vec3 objectNormal;
        createTube(t, volume, transformedYo, objectNormal);

        // vec3 transformedNormal = normalMatrix * objectNormal;

        return transformedYo;
      }

      vec3 makeGeoNormal () {
        float t = (tubeInfo) + 0.5;
        float thickness = 200.0 *  0.01 * (1.0 - t);

        vec2 volume = vec2(thickness);
        vec3 transformedYo;
        vec3 objectNormal;
        createTube(t, volume, transformedYo, objectNormal);

        vec3 transformedNormal = normalMatrix * objectNormal;

        return transformedNormal;
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

      shader.vertexShader = shader.vertexShader.replace(
        `#include <project_vertex>`,
        `



vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;

gl_Position = projectionMatrix * mvPosition;


        `
      )

      shader.fragmentShader = shader.fragmentShader.replace(
        `void main() {`,
        `${`
  varying float vT;
  varying vec3 vSize;

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


        float aa = diffuseColor.a * (1.0 - vT);

        if (aa >= 0.01) {
          gl_FragColor = vec4( outgoingLight, aa );
        } else {
          gl_FragColor.rgba *= 0.0;
          discard;
        }


      `
      )

      //
      // console.log(shader.fragmentShader)
    }
    let line1 = new Mesh(geometry, matLine1)

    this.o3d.add(line1)

    // line1.visible = true
    node.onClean(() => {
      line1.removeFromParent()
    })
    line1.frustumCulled = false
    line1.userData.enableBloom = true

    // await this.sim.wait
    node.onLoop(() => {
      let result = this.sim.getTextureAfterCompute()
      // matLine0.uniforms.posTexture.value = result.posTexture
      // matLine0.uniforms.time.value = window.performance.now() / 1000
      matLine1.userData.uniforms.posTexture.value = result.posTexture
      matLine1.userData.uniforms.time.value = window.performance.now() / 1000
    })
  }
}
