#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


#define PI 3.14159265359
#define rot(a) mat2(cos(a), -sin(a), sin(a), cos(a))


vec2 repeat(vec2 p, vec2 tileSize) {
    // Creates a repeating pattern of tiles with size tileSize
    vec2 p1 = mod(p, tileSize) - tileSize * 0.5;
    return p1 / (tileSize * 0.5);
}


vec3 col1(vec2 p) {
    vec2 p1 = p;
    p1 = rot(u_time * 0.2) * p1;
    
    p1 = repeat(p1 * p1, vec2(fract(p.y / sin(p.x + p.y)), sin(u_time * 0.1) + 0.4));

    p1 = rot(u_time) * p1;

    float d1 = length(p1);
    d1 = step(0.8, d1);

    float d2 = p1.x * p1.y + p1.y;
    d2 = step(0.2 + sin(p.y), d2);

    vec3 col = vec3(d1 * d2);
    return col;
}


void main() {
    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;

    vec3 col = col1(p);

    vec3 color = vec3(col);
    
    gl_FragColor = vec4(color,1.0);
}
