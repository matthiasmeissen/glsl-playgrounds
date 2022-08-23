#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


void main() {

    vec2 p = gl_FragCoord.xy / u_resolution;
    vec2 mouse = u_mouse / u_resolution;

    float s = mod(abs(sin(u_time * 0.4)) + 0.1, p.y) * p.x * (1.0 - p.x);

    s = step(0.1, s * 8.0);

    vec3 color = vec3(s);

    gl_FragColor = vec4(color,1.0);
}
