#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


#define rot(a) mat2(cos(a), -sin(a), sin(a), cos(a))


float halfCircle (vec2 p, float radius, float rotation, float pos) {
    float l = step(radius, length(p));
    float t = step(pos, (p * rot(rotation)).x);
    return t - l;
}


void main() {

    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;

    float d = halfCircle(p, 0.8, u_time, 0.0);

    for (float i = 1.0; i < 80.0; i++) {
        d /= halfCircle(p, (0.2 * i) / 8.0, u_time * i * 0.04, 0.0);
    }

    vec3 color = vec3(d);

    gl_FragColor = vec4(color,1.0);
}
