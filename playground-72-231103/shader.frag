#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


#define PI 3.14159265359
#define rot(a) mat2(cos(a), -sin(a), sin(a), cos(a))

vec3 col1(vec2 p, float size) {
    vec2 p1 = p * size * 4.0;
    
    vec2 p2 = rot(u_time) * p1;

    p1 = mod(p1 - 1.0, 2.0) - 1.0;

    float d1 = length(p1 * p2);
    float d2 = atan(p1.y * p2.x, p2.x + length(p * p2)) / PI / 2.0 + 0.5;

    d1 = step((abs(sin(u_time * 0.4)) + 0.2) * 0.4, d1);
    d2 = smoothstep(0.0, 0.2, d2);


    vec3 col = vec3(d1) * vec3(d2, d2, 1.0);
    return col;
}


void main() {
    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;

    vec3 col1 = col1(p, mouse.x);

    vec3 color = vec3(col1);
    
    gl_FragColor = vec4(color,1.0);
}
