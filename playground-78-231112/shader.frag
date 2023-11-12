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


vec3 col1(vec2 p) {
    vec2 p1 = p * p;

    p1 = atan(p1 * u_time * 0.2) / PI;
    p1 = rot(u_time * 0.2) * p1;
    p1 = repeat(p1, vec2(sin(p.x * 0.4), fract(p.y * p.x * 8.0)) * rot(p1.y * p.x));
    p1 = sign(p1) + sqrt(abs(p1));
    
    float d1 = length(p1) - 1.0;
    d1 = abs(d1 - abs(sin(u_time * 0.2))) - 0.1;
    d1 = step(p1.y > 0.4 ? 0.1 : 0.02, d1);
    d1 = 1.0 - d1;

    vec3 col = vec3(d1);
    return col;
}


void main() {
    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;

    vec3 col = col1(p);

    vec3 color = vec3(col);
    
    gl_FragColor = vec4(color,1.0);
}
