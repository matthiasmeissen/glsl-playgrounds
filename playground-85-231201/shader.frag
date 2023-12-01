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

vec3 col1(vec2 p, float t, float s, float o) {
    vec2 p1 = p * p;

    p1 = rot(t + p.x) * p1 * p;

    vec3 c1 = vec3(1.0);
    c1.r = nsin(p1.x * s + t - o);
    c1.g = nsin(p1.x * s + t);
    c1.b = nsin(p1.x * s + t + o);

    float d1 = distance(p1 * rot(t), vec2(c1.r, c1.g));
    
    d1 = smoothstep(0.8, 1.0, d1);

    vec3 color = c1 - vec3(d1);

    return color;
}


void main() {
    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;

    vec3 col = col1(p, u_time, 4.0, 1.0);

    vec3 color = vec3(col);
    
    gl_FragColor = vec4(color,1.0);
}
