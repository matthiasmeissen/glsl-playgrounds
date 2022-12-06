#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


#define rot(a) mat2(cos(a), -sin(a), sin(a), cos(a))


float circle (vec2 p, float r) {
    float d = length(p);
    float c = step(r, d) - step(r + 0.02, d);
    return c;
}


void main() {

    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;

    vec2 p1 = p;

    p1 = sin(p1 * 1.2);
    p1 = p1 * rot(u_time * 0.2);

    p1.x = sin(u_time) > 0.0 ? p1.x * 0.1 : p1.x * 0.2;

    p1.y = p.x > -0.4 && p.x < 0.4 ? p1.y : p1.y * 0.2;

    p1 = mod(vec2(0.4), p1);
    p1 = p1 * rot(u_time);

    float d1 = circle(vec2(p1.x, p1.y * 1.4), 0.4);
    float d2 = circle(vec2(p1.x + 0.8, p1.y * 1.4), 0.4);
    float d3 = circle(vec2(p1.x - 0.8, p1.y * 1.4), 0.4);
    float d4 = circle(vec2(p1.x, p1.y), 0.2);

    float d = d1 + d2 + d3 + d4;


    vec3 color = vec3(d);

    gl_FragColor = vec4(color,1.0);
}
