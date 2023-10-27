#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


#define PI 3.14159265359
#define rot(a) mat2(cos(a), -sin(a), sin(a), cos(a))

vec3 col1(vec2 p) {
    vec2 p1 = p * 2.0;

    p1 = rot(u_time * 0.4) * p1;
    
    float d1 = step(0.4, atan(p1.x * p.y, fract(p1.y + u_time * 0.4)));

    float d2 = smoothstep(0.0, 0.8, atan(sin(p1.x) * p1.y, fract(p.y + u_time * 0.2)));

    vec3 col = vec3(d1 + d2);
    return col;
}


void main() {
    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;

    vec3 col1 = col1(p);

    vec3 color = vec3(col1);
    
    gl_FragColor = vec4(color,1.0);
}
