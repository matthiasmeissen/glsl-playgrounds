#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

uniform sampler2D u_buffer0;
uniform sampler2D u_buffer1;


float sdCircle(in vec2 p, in float r)
{
  return length(p) - r;
}

vec3 pal(in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d)
{
  return a + b * cos(6.28318 * (c * t + d));
}

void setCoordinates(out vec2 uv, out vec2 p, out vec2 uvMouse, out vec2 mouse)
{
  uv = gl_FragCoord.xy / u_resolution;
  p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y; 
  uvMouse = u_mouse / u_resolution;
  mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y; 
}

#if defined(BUFFER_0)

void main() {
  vec2 uv, p, uvMouse, mouse;
  setCoordinates(uv, p, uvMouse, mouse);

  vec3 buffer = texture2D(u_buffer1, uv).rgb;
  buffer *= 0.99;

  float c1 = sdCircle(uv - abs(vec2(sin(u_time * 0.4), sin(u_time * 0.4))), 0.2);
  float c2 = sdCircle(vec2(mod(uv.x, 0.2), uv.y) - abs(vec2(sin(u_time * 0.2), sin(u_time * 0.6))), 0.2);
  float c3 = sdCircle(uv + sin(p + u_time), 0.4);

  float c = min(c1, c2);
  c = max(-c3, c);

  buffer = mix(buffer, vec3(1.0), c);
  gl_FragColor = vec4(buffer, 1.0);
}

#elif defined(BUFFER_1)

void main() {
  vec2 p = gl_FragCoord.xy / u_resolution;

  vec3 buffer = texture2D(u_buffer0, p).rgb;
  gl_FragColor = vec4(buffer, 1.0);
}

#else

void main() {
  vec2 p = gl_FragCoord.xy / u_resolution;
    
  vec3 b1 = texture2D(u_buffer1, p).rgb;
  vec3 color = pal(clamp(b1.x, 0.0, p.y * 2.0) + u_time * 0.4, vec3(0.5 + u_time * 0.2, 0.5, 0.5), vec3(0.5, 0.5, 0.5), vec3(0.5, 0.5, 0.5), vec3(0.42, 0.62, 0.68));
  gl_FragColor = vec4(color, 1.0);
}

#endif
