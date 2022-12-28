uniform sampler2D pos0;
attribute vec4 meta0;
uniform float time;

void main (void) {
  //
  vec4 pos0data = texture2D(pos0, meta0.xy);

  gl_Position = projectionMatrix * modelViewMatrix * pos0data;

  gl_PointSize = 1.0;
}

//
