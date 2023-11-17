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

float nsin(float x) {
    return sin(x) * 0.5 + 0.5;
}


float col1(vec2 p) {
    vec2 p1 = p * p;
    p1 = rot(u_time * 0.4) * p1;

    float d1 = distance(p1.x * p.y, p1.y);
    d1 = smoothstep(0.0, 0.4, sin(d1));

    return d1;
}

float col2(vec2 p) {
    vec2 p1 = p * p;

    float d1 = distance(cos(p1 + u_time), vec2(nsin(p1.x + u_time), p.y));
    d1 = pow(d1, 0.8);

    return d1;
}


void main() {
    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;

    vec3 col1 = vec3(col1(p));
    vec3 col2 = 1.0 - vec3(col2(p - 0.1), col2(p - 0.02), col2(p + 0.1));

    vec3 col = col1 * col2;

    vec3 color = vec3(col);
    
    gl_FragColor = vec4(color,1.0);
}
