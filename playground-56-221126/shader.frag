#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


#define rot(a) mat2(cos(a), -sin(a), sin(a), cos(a))


float spiralSDF(vec2 st, float t) {
    float r = dot(st, st);
    float a = atan(st.y, st.x);
    return abs(sin(fract(log(r) * t + a * 0.159)));
}


void main() {

    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;

    float s = spiralSDF(p * rot(u_time), 0.8);

    vec2 p1 = p * rot(1.58);

    float t = atan(p1.y, p1.x);

    float s1 = step(abs(sin(u_time * 1.2)) * 3.14 + 1.0, s * t * t);
    float s2 = step(abs(sin(u_time)) * 3.14, s * t * t);
    float s3 = step(abs(sin(u_time)) * 3.14, s / t);
    float s4 = step(abs(sin(u_time * 0.4)) * 3.14, s * t);

    s = s2 - s1 + s3 + s4;

    vec3 color = vec3(s);

    gl_FragColor = vec4(color,1.0);
}
