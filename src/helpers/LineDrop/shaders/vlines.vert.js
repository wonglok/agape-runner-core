module.exports = /* glsl */ `
  attribute vec3 offsets;
  attribute vec3 rand3;
  uniform float progress;
  uniform float initHeight;
  uniform float unitSize;
  varying vec2 vUv;
  varying vec3 vRand3;

  // mat3 calcLookAtMatrix(vec3 origin, vec3 target, float roll) {
  //   vec3 rr = vec3(sin(roll), cos(roll), 0.0);
  //   vec3 ww = normalize(target - origin);
  //   vec3 uu = normalize(cross(ww, rr));
  //   vec3 vv = normalize(cross(uu, ww));

  //   return mat3(uu, vv, ww);
  // }

  void main (void) {
    vRand3 = rand3;
    vUv = uv;
    vec3 faceMePos = position;

    float myProgress = (1.0 - (progress)) * rand3.z;

    faceMePos.y += initHeight;
    faceMePos.y *= myProgress;

    // faceMePos *= calcLookAtMatrix(vec3(0.0), vec3(cameraPosition.xyz), 0.0) * faceMePos;
    faceMePos *= faceMePos;

    vec3 newOffsets = offsets + vec3(0.0, initHeight * myProgress, 0.0) * rand3 + vec3(0.0, rand3.y * initHeight * 3.0 * myProgress * rand3.y, 0.0);

    vec3 outputPos0 = faceMePos + newOffsets;

    vec3 outputPos1 = vec3(position.x, position.y * unitSize / (initHeight), position.z) + offsets;

    vec4 mvPosition = modelViewMatrix * vec4(mix(outputPos0, outputPos1, progress), 1.0);

    gl_Position = projectionMatrix * mvPosition;
  }
`

//
