#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define rot(a) mat2(cos(a), -sin(a), sin(a), cos(a))


float cirlce (vec2 p, float repeat, float size, float speed) {
    float t = fract(length(p * repeat) - speed * 2.0);
    vec2 p1 = p * rot(repeat * speed * 0.4);
    float d = step(radians(size), atan(p1.x, p1.y));
    return t * d;
}



void main() {

    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;

    float s = 0.0;

    for (float i = 0.0; i < 10.0; i ++) {
        float t = cirlce(p, i, (i / 10.0) * 20.0, u_time * i * 0.1);
        s += t * 0.2;
    }

    s = step(0.8, s);

    vec3 color = vec3(s);

    gl_FragColor = vec4(color,1.0);
}
