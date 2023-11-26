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

vec3 col1(vec2 p, float t) {
    vec2 p1 = p * p;

    vec2 p2 = rot(t * 0.1) * p1;

    p1 = p1 / p2 * 0.2;

    p1.x = nsin(p1.x * 8.0 + t);
    p1.y = nsin(p1.y * 4.0);

    float d1 = length(p1 * p) / distance(p1 * p1, p2);

    d1 = step(nsin(p1.x), d1) - step(nsin(p1.x) + p1.y, d1);

    vec3 color = vec3(d1);

    return color;
}


void main() {
    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;

    vec3 col = col1(p, u_time);


    vec3 color = vec3(col);
    
    gl_FragColor = vec4(color,1.0);
}
