#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

struct PaletteColor {
  vec3 a;
  vec3 b;
  vec3 c;
  vec3 d;
};

PaletteColor p1 = PaletteColor(
  vec3(0.5),
  vec3(0.5),
  vec3(0.4),
  vec3(0.54, 0.82, 0.86)
);

vec3 pal(in float t, in PaletteColor pc)
{
  return pc.a + pc.b * cos(6.28318 * (pc.c * t + pc.d));
}

float sdCircle(in vec2 p, in float r)
{
  return length(p) - r;
}

float sdOnion(in float shape, in float l)
{
  return abs(shape) - l;
}

void main() {
  vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;  
  vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 uvMouse = u_mouse / u_resolution.xy;

  float radius = ((sin(u_time * 0.41) + 1.0) * 0.5) + 0.4;
  float line = ((sin(u_time * 0.62) + 1.0) * 0.5) * 0.02;

  float c = sdCircle(p, radius);
  c = sdOnion(c, line);
  float d = step(c, line);

  vec3 color = vec3(d) + pal(c + u_time * 0.2, p1);

  gl_FragColor = vec4(color,1.0);
}
