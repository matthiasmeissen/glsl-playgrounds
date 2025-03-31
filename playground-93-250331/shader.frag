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

// Instead of returning c with the return function 
// It uses an out parameter to do that
void stepValue(in vec2 uv, in float num, in float factor, out float c) {
  //c = step(uv.x, mod(num / factor, 1.0));
  c = smoothstep(uv.x, 0.0, mod(num / factor, 1.0));
}


void main() {
  vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;  
  vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 uvMouse = u_mouse / u_resolution.xy;

  float c = 1.0;
  float num = uvMouse.x * 400.0;

        if (uv.y > 1.0 - 0.2) { stepValue(uv, num, 1.0, c);     } 
  else  if (uv.y > 1.0 - 0.4) { stepValue(uv, num, 10.0, c);    } 
  else  if (uv.y > 1.0 - 0.6) { stepValue(uv, num, 100.0, c);   }
  else  if (uv.y > 1.0 - 0.8) { stepValue(uv, num, 1000.0, c);  }
  else  if (uv.y > 1.0 - 1.0) { stepValue(uv, num, 10000.0, c); }

  vec3 color = pal(c, vec3(0.5, 0.5, 0.5), vec3(0.5, 0.5, 0.5), vec3(0.5, 0.5, 0.5), vec3(uvMouse.y, 0.43, 0.68));

  gl_FragColor = vec4(color,1.0);
}
