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
    vec2 p1 = abs(p + t) * p / fract(vec2(p.x + p.y + 0.5, p.y * 4.0 + t));
    p1 = p1 * rot(u_time);
    vec2 pr = p;
    vec2 pg = vec2(p1.x - 0.2, p1.y);
    vec2 pb = vec2(p1.x + 0.1, p1.y);

    float d1 = distance(p1.x * p1.y, p.y + p1.x);

    vec3 color = vec3(nsin(t) * 0.2, pg.x, pb.x) - d1;

    return color;
}


void main() {
    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;

    vec3 col = col1(p, u_time * 0.1);


    vec3 color = vec3(col);
    
    gl_FragColor = vec4(color,1.0);
}
