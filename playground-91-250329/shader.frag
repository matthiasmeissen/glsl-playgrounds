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


float repeatCircle(in vec2 p, in float repeat, in float offsetX, in float normalizedX) 
{
  float scale = mix(4.0, 0.8, normalizedX);
  vec2 circles = vec2(mod(p.x, repeat) + offsetX, p.y * 0.4) * scale;
  
  return length(circles);
}

// This is a weird example, but a functions parameter can be definde as an out as well
// Meaning that it will write to a variable passed to it
// This function does not return any value, but instead writes to the variable clampedValue
void clampExample (in float value, out float clampedValue) 
{
  clampedValue = clamp(value, 0.0, 1.0);
}


void main() {
  vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;  
  vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;

  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 uvMouse = u_mouse / u_resolution.xy;

  float circle = repeatCircle(p * length(p), mod(u_time, 2.0), sin(mouse.x), uv.x);

  // Here we take the circle value as an input, compute it and write the new value to it
  clampExample(circle, circle);

  vec3 colora = vec3(0.5);
  vec3 colorb = vec3(0.5);
  vec3 colorc = vec3(1.0);
  vec3 colord = vec3(0.0,0.33,0.67);
  colord = vec3(uvMouse.x, uvMouse.y, 0.4);

  vec3 color = pal(circle, colora, colorb, colorc, colord);

  gl_FragColor = vec4(color,1.0);
}
