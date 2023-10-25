#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


#define PI 3.14159265359
#define rot(a) mat2(cos(a), -sin(a), sin(a), cos(a))

vec3 col1(vec2 p) {
    vec2 p1 = p * p * 8.0;
    p1 = rot(u_time) * p1;

    vec2 p2 = vec2(atan(p1.x, p.y) / PI + 0.5, length(length(p) > 0.6 ? p : p / p1 * 4.0)) * sin(u_time * 0.2) * 2.0;

    float d1 = distance(p2.x, p2.y);
    float d2 = length(p2);

    vec3 col = vec3(d1 * d2);
    return col;
}


void main() {
    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;

    vec3 col1 = 1.0 - col1(p);

    vec3 color = vec3(col1);
    
    gl_FragColor = vec4(color,1.0);
}
