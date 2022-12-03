#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float circle (vec2 p, float r, float s) {
    return step(r, length(p)) - step(r + s, length(p));
}


void main() {

    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;

    float d = 0.0;

    for (float i = 0.0; i < 10.0; i++) {
        p = p * 1.1;
        float s = sin((p.y * 10.0 / i) + u_time) * 0.4;
        s = s * (p.y * 10.0 / i);
        float c = circle(vec2(p.x, s), 0.8 - i * 0.04, 0.02);
        d += c;
    }

    vec3 color = vec3(d);

    gl_FragColor = vec4(color,1.0);
}
