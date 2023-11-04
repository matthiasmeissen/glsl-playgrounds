#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


#define PI 3.14159265359
#define rot(a) mat2(cos(a), -sin(a), sin(a), cos(a))

float sdOutline(float d, float size, float width) {
    return smoothstep(size, size + width * 4.0, d) - smoothstep(size + width, size + width * 4.0, d);
}


vec3 col1(vec2 p) {
    vec2 p1 = p;
    p1 = mod(p1 * p1 - 1.0, 2.0) - 1.0;
    float d1 = length(vec2(p1.x, p1.y + 1.0) * 0.5) + sin(u_time * 0.4 + p.y);

    vec2 p2 = rot(u_time) * p1 / p1.y + 4.0;
    float d2 = atan(p2.x, p.y * p1.y) / PI * 0.5 + 1.0;

    float c1 = 0.0;

    for (float i = 0.0; i < 40.0; i++) {
        c1 += sdOutline(d1 * d2, 1.0 - 1.0 / i, 0.004);
        c1 += length(p1 * p2) * 0.01;
    }

    c1 = 1.0 - c1;

    vec3 col = vec3(c1);
    return col;
}


void main() {
    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;

    vec3 col1 = col1(p);

    vec3 color = vec3(col1);
    
    gl_FragColor = vec4(color,1.0);
}
