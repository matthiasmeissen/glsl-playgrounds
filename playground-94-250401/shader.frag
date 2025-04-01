#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// This creates a Struct, some custom data type that holds a combination of basic data types
struct PaletteColor {
  vec3 a;
  vec3 b;
  vec3 c;
  vec3 d;
};

// There are two ways to create and initialize a new struct
// You can create it like any variable by: PaletteColor p1;
// And then assing values to the elements by: p1.a = vec3(0.5);
// But this approach only works inside a function

// There is another way to create and initialize a struct
// This approach works outside any function
PaletteColor p2 = PaletteColor(
  vec3(0.5),
  vec3(0.5),
  vec3(0.5),
  vec3(0.4, 0.6, 0.8)
);

// This function uses a struct to define the colors
vec3 pal(in float t, in PaletteColor pc)
{
  return pc.a + pc.b * cos(6.28318 * (pc.c * t + pc.d));
}

void main() {
  vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;  
  vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 uvMouse = u_mouse / u_resolution.xy;

  PaletteColor p1 = PaletteColor( vec3(0.5), vec3(0.5), vec3(0.5), vec3(0.4, 0.6, 0.8) );

  p1.d = vec3(mod(p.y * uv.y + tan(uv.y), uv.x + length(p)) + 0.4, mod(uv.x, uv.y * p.y), 0.8);

  float c = length(p * p);
  c = smoothstep(pow(uv.y, 8.0), 1.0, c);

  vec3 color = pal(c, p1);

  gl_FragColor = vec4(color,1.0);
}
