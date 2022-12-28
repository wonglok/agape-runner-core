uniform float time;

uniform vec3 mouse;
uniform sampler2D meta0;
uniform float delta;

#include <common>

float hash(float n) { return fract(sin(n) * 1e4); }

float noise(float x) {
  float i = floor(x);
  float f = fract(x);
  float u = f * f * (3.0 - 2.0 * f);
  return mix(hash(i), hash(i + 1.0), u);
}


void main (void) {
  vec2 uv = vec2(gl_FragCoord.x, gl_FragCoord.y) / resolution.xy;

  vec4 velData = texture2D(textureVelocity, uv);

  if (velData.w == 0.0) {
    velData.x = 0.0;
    velData.y = 0.0;
    velData.z = 0.0;
    velData.w = 1.0;
    gl_FragColor = vec4(velData.x, velData.y, velData.z, 1.0);

    return;
  }

  #chunk-computeBody

  gl_FragColor = vec4(velocity.x, velocity.y, velocity.z, 1.0);
}
