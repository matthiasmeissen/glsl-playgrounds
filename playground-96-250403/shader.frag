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

float sdBox(in vec2 p, in vec2 b)
{
  vec2 d = abs(p) - b;
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}

void setCoordinates(out vec2 uv, out vec2 p, out vec2 uvMouse, out vec2 mouse)
{
  uv = gl_FragCoord.xy / u_resolution;
  p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y; 
  uvMouse = u_mouse / u_resolution;
  mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y; 
}

void main() {
  vec2 uv, p, uvMouse, mouse;
  setCoordinates(uv, p, uvMouse, mouse);

  float c = sdCircle(vec2(p.x - sin(u_time), p.y), 0.8);
  float b = sdBox(p, vec2(1.0, 0.4));

  float sdUnion = min(c, b);
  float sdSubtract = max(-c, b);
  float sdIntersect = max(c, b);
  float sdXor = max(min(c, b), -max(c, b));

  float t = sdUnion;
  if (uvMouse.x > 0.25) { t = sdSubtract; };
  if (uvMouse.x > 0.5) { t = sdIntersect; };
  if (uvMouse.x > 0.75) { t = sdXor; };

  float f = uvMouse.y > 0.2 ? step(0.2 * uvMouse.y, t) : t;

  vec3 color = uvMouse.y > 0.2 ? vec3(f) : pal(f, p1);

  gl_FragColor = vec4(color,1.0);
}
