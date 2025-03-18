#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


#define PI 3.14159265359
#define rot(a) mat2(cos(a), -sin(a), sin(a), cos(a))


vec2 repeat(vec2 p, vec2 tileSize) {
  vec2 p1 = mod(p, tileSize) - tileSize * 0.5;
  return p1 / (tileSize * 0.5);
}

vec3 floatToGradient(float value) {
  // Define color stops for the gradient
  const int NUM_COLORS = 4;
  vec3 colors[NUM_COLORS];
  float positions[NUM_COLORS];
  
  // Define color palette
  colors[0] = vec3(1.0, 1.0, 1.0);  // white
  colors[1] = vec3(1.0, 1.0, 0.0);  // yellow
  colors[2] = vec3(0.3, 0.0, 0.6);  // purple
  colors[3] = vec3(1.0, 1.0, 1.0);  // white (to loop back smoothly)
  
  // Define positions for each color (must be in ascending order from 0.0 to 1.0)
  positions[0] = 0.0;
  positions[1] = 0.3;
  positions[2] = 0.6;
  positions[3] = 1.0;

  // Animate the gradient by offsetting the value
  float speed = 0.2;
  value = mod(value + u_time * speed, 1.0);
  
  // Handle values outside the 0-1 range
  if (value < 0.0) {
    // For values below 0, extend the first color segment
    float t = -value;
    // Return the first color
    return colors[0];
  }
  else if (value > 1.0) {
      // For values above 1, extend the last color segment
      float t = value - 1.0;
      // Return the last color
      return colors[NUM_COLORS-1];
  }
  
  // For values in range [0.0, 1.0], find the color segment
  for (int i = 0; i < NUM_COLORS - 1; i++) {
    if (value >= positions[i] && value <= positions[i + 1]) {
        // Calculate how far we are between the two colors (0.0 to 1.0)
        float t = (value - positions[i]) / (positions[i + 1] - positions[i]);
          
        // Linear interpolation between the two colors
        return mix(colors[i], colors[i + 1], t);
    }
  }
  
  return vec3(0.0, 0.0, 0.0);
}


float repeatCircle(vec2 p, float offsetX, float normalizedX) {
  float repeat = 0.3;
  float scale = mix(4.0, 0.8, normalizedX);
  vec2 circles = vec2(mod(p.x, repeat) + offsetX, p.y) * scale;
  return length(circles);
}


void main() {
  vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
  vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;

  vec2 uv = gl_FragCoord.xy / u_resolution.xy;

  float circle = repeatCircle(p, sin(u_time * 0.4), uv.x);

  circle = clamp(circle, 0.0, 1.0);

  vec3 color = floatToGradient(circle);

  gl_FragColor = vec4(color,1.0);
}
