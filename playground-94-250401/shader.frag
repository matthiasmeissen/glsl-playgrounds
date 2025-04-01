#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 pal(in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d)
{
  return a + b * cos(6.28318 * (c * t + d));
}

// Simple function that normalizes a sin from 0-1 by adding 1 and dividing by 2 again
// Then it maps the output range from 0-1 to the desired range with a mix function
// A formular to normalize range  (v - iMin) / iMax - iMin
// For a sin range this is        (v - (-1)) / 1 - (-1)
// Which leads to this            (v + 1) / 2
float modRange(in float min, in float max, in float speed)
{
  float val = (sin(u_time * speed) + 1.0) * 0.5;
  return mix(min, max, val);
}

void main() {
  vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;  
  vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 uvMouse = u_mouse / u_resolution.xy;

  float c = length(vec2(p.x < 0.5 ? p.x : p.x / p.y, p.y - sin(u_time * 0.1)) * sin(u_time * 0.06));

  c = smoothstep(pow(uv.y, 4.0), 1.0, c);

  vec3 color = pal(c, vec3(0.5, 0.5, 0.5), vec3(0.5, 0.5, 0.5), vec3(0.5, 0.5, 0.5), vec3(modRange(0.48, 0.52, 0.01), 0.43, 0.68));

  gl_FragColor = vec4(color,1.0);
}
