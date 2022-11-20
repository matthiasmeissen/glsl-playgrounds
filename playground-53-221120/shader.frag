#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float slice (vec2 p, float s, vec2 r) {

    float s1 = radians((1.0 - s) * 360.0 - 180.0);
    float t = step(s1, atan(p.y, p.x));

    float d = step(r.x - r.y, length(p)) - step(r.x + r.y, length(p));
    float l = t * d;

    return l;
}


void main() {

    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;

    float d = 0.0;

    for (float i = 0.0; i < 20.0; i++) {
        d += slice(p * abs(sin(u_time * 0.1)) * 2.0, i / 10.0 * (abs(sin(u_time * 0.2)) - 0.2), vec2(i * 0.1, 0.04));
    }

    vec3 color = vec3(d);

    gl_FragColor = vec4(color,1.0);
}
