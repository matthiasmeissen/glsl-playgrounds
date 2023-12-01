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
    vec2 p1 = p;
    p1.x = nsin(p1.x + 4.0);
    p1 = rot(t * 0.4) * p1;

    float c1 = p1.x * sin(t) * sin(t * 0.2) * abs(p1.y + 4.0) + abs(p1.x);
    float c2 = (p1.x + 0.2) * sin(t) * sin(t * 0.2) * abs(p1.y + 4.0) + abs(p1.x);

    float d1 = distance(p * p * rot(t * 0.4), vec2(distance(p1.x, p.y), p.y));
    d1 = step(d1, nsin(p.y + t * 0.2));

    vec3 color = vec3(c1, c2, 1.0) * vec3(d1);

    return color;
}


void main() {
    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;

    vec3 col = col1(p, u_time);

    vec3 color = vec3(col);
    
    gl_FragColor = vec4(color,1.0);
}
