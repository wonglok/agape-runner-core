import {
  Color,
  Object3D,
  Mesh,
  InstancedBufferAttribute,
  InstancedBufferGeometry,
  MeshPhysicalMaterial,
  DoubleSide,
  IcosahedronBufferGeometry,
  FrontSide,
} from 'three'

export class ParticleRenderable extends Object3D {
  constructor({
    core,
    sizeX,
    sizeY,
    renderConfig = {},
    getTextureAlpha = () => {},
    getTextureBeta = () => {},
  }) {
    super()
    this.core = core
    let SIZE_X = sizeX
    let SIZE_Y = sizeY
    let boxGeo = new IcosahedronBufferGeometry(0.03, 2)

    let geo = new InstancedBufferGeometry()
    geo.copy(boxGeo)

    // geo.setAttribute('position', boxGeo.attributes.position)
    // geo.setAttribute('normal', boxGeo.attributes.normal)
    geo.instanceCount = SIZE_X * SIZE_Y

    let getUVInfo = () => {
      let newArr = []
      let na = 0
      for (let j = 0; j < SIZE_Y; j++) {
        for (let i = 0; i < SIZE_X; i++) {
          newArr[na + 0] = i / SIZE_X
          newArr[na + 1] = j / SIZE_Y
          newArr[na + 2] = 0
          na += 3
        }
      }
      return newArr
    }

    //
    geo.setAttribute(
      'uvinfo',
      new InstancedBufferAttribute(new Float32Array(getUVInfo()), 3, true, 1)
    )

    let getMat = () => {
      let matt = new MeshPhysicalMaterial({
        color: new Color('#ffffff'),
        transparent: true,
        roughness: 0.0,
        metalness: 0.0,
        side: FrontSide,
        reflectivity: 0.0,
        transmission: 1.0,
        ior: 1.25,
        ...renderConfig,
      })

      //

      matt.onBeforeCompile = (shader, gl) => {
        //
        shader.uniforms.time = { value: null }
        this.core.onLoop((dt) => {
          let time = window.performance.now() / 1000
          shader.uniforms.time.value = time
        })
        shader.uniforms.tPos = { value: null }
        shader.uniforms.tPos2 = { value: null }
        this.core.onLoop(() => {
          shader.uniforms.tPos.value = getTextureAlpha()
          shader.uniforms.tPos2.value = getTextureBeta()
        })
        shader.vertexShader = shader.vertexShader.replace(
          `void main() {`,
          /* glsl */ `
        uniform sampler2D tPos;
        uniform sampler2D tPos2;
        attribute vec3 uvinfo;
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
          //
          vec4 tt = texture2D(tPos, uvinfo.xy);
          vec3 tn = normalize(tt.rgb);
          vec3 pos = position;
          pos *= rotateX(tn.r * 3.1415);
          pos *= rotateY(tn.g * 3.1415);
          pos *= rotateZ(tn.b * 3.1415);

          //
          vec3 transformed = vec3( tt.rgb + pos );
        `
        )

        shader.vertexShader = shader.vertexShader.replace(
          `#include <beginnormal_vertex>`,
          /* glsl */ `
          vec3 nPosNormal = normalize(normal);

          vec4 tt2 = texture2D(tPos, uvinfo.xy);
          vec3 tn2 = normalize(tt2.rgb);

          nPosNormal = rotateX(tn2.r * 3.1415) * nPosNormal;
          nPosNormal = rotateY(tn2.g * 3.1415) * nPosNormal;
          nPosNormal = rotateZ(tn2.b * 3.1415) * nPosNormal;

          vec3 objectNormal = vec3( nPosNormal );

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
    let matt = getMat()
    let renderable = new Mesh(geo, matt) // material
    renderable.frustumCulled = false
    renderable.userData.enableBloom = true

    this.add(renderable)
    this.core.onClean(() => {
      renderable.removeFromParent()
    })
  }
}
