#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float sdCircle(in vec2 p, in float r)
{
  return length(p) - r;
}

float sdBox(in vec2 p, in vec2 b)
{
  vec2 d = abs(p) - b;
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}

float opSmoothUnion(in float d1, in float d2, in float k )
{
    float h = clamp(0.5 + 0.5 * (d2 - d1) / k, 0.0, 1.0);
    return mix(d2,d1, h) - k * h * (1.0 - h);
}

float opSmoothUnionSimple( float d1, float d2, float k ) {
    float diff = d1 - d2;
    float smoothFactor = sqrt(diff * diff + k * k);
    return 0.5 * (d1 + d2 - smoothFactor);
}

float round(in float x) 
{
  return floor(x + 0.5);
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

  float s = uvMouse.x * 0.2 + 0.1;
  float repeatedX = p.x - s * round(p.x / s);
  vec2 pr = vec2(repeatedX, p.y);

  float c = sdCircle(vec2(p.x - sin(u_time), p.y), 0.2);
  float b = sdBox(pr, vec2(s * 0.2, 0.4));

  float sm = opSmoothUnion(c, b, uvMouse.y);

  float f = step(sm, 0.0);

  vec3 color = vec3(f);

  gl_FragColor = vec4(color,1.0);
}
