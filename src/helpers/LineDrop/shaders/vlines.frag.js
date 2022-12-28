module.exports = /* glsl */ `
  varying vec2 vUv;
  uniform float progress;
  varying vec3 vRand3;

  void main (void) {
    // gl_PointSize = 1.0;
    vec3 cDiffusion = vec3(
      pow(vRand3.x, 1.0 - progress + 0.15),
      pow(vRand3.y, 1.0 - progress + 0.15),
      pow(vRand3.z, 1.0 - progress + 0.15)
    );
    gl_FragColor = vec4(cDiffusion,  1.0 * (progress));
  }

`
