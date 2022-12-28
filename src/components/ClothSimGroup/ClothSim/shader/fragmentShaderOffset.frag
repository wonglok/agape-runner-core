uniform float time;

uniform vec2 mouse;
uniform sampler2D meta0;
uniform float delta;

#include <common>

void main (void) {
  //
  vec2 uv = vec2(gl_FragCoord.x, gl_FragCoord.y) / resolution.xy;

  vec4 metaData = texture2D(meta0, uv);
  vec4 velData = texture2D(textureVelocity, uv);
  vec4 offsetPosData = texture2D(textureOffset, uv);

  if (offsetPosData.w == 0.0) {
    offsetPosData.x = (uv.x * 2.0 - 1.0) * 100.0;
    offsetPosData.y = (uv.y * 2.0 - 1.0) * 100.0;
    offsetPosData.z = 0.0;
    offsetPosData.w = 1.0;
  }

  gl_FragColor = vec4(offsetPosData.x, offsetPosData.y, offsetPosData.z, offsetPosData.w);

}

