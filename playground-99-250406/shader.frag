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

float opSmoothUnionSimple( float d1, float d2, float k ) 
{
    float diff = d1 - d2;
    float smoothFactor = sqrt(diff * diff + k * k);
    return 0.5 * (d1 + d2 - smoothFactor);
}

float round(in float x) 
{
  return floor(x + 0.5);
}

vec2 repeat(in vec2 p, in vec2 s)
{
  float repeatedX = p.x - s.x * round(p.x / s.x);
  float repeatedY = p.y - s.y * round(p.y / s.y);
  return vec2(repeatedX, repeatedY);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
  vec2 uvMouse = u_mouse / u_resolution;
  vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;

  float s = 0.2;
  vec2 rep = repeat(p, vec2(s, s));
  float t = uvMouse.y * 3.0 + 1.0;

  float c1 = sdCircle(vec2(p.x - sin(u_time), p.y), 0.2);
  float c2 = sdCircle(vec2(p.x * sin(p.y * t) + sin(u_time), p.y - 0.6), 0.2);
  float c3 = sdCircle(vec2(p.x * sin(p.y * t) + sin(u_time), p.y + 0.6), 0.2);

  float c = min(c1, c2);
  c = min(c, c3);

  float b = sdBox(rep, vec2(s * 0.2, s * 0.2));

  float sm = opSmoothUnion(c, b, 0.1 + uvMouse.y * 0.2);

  float f = mix(step(sm, 0.004) - step(sm, 0.0), step(sm, 0.0), abs(pow(p.x, 4.0)) * uvMouse.x);

  vec3 color = vec3(f);

  gl_FragColor = vec4(color,1.0);
}
