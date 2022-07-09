#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


void main() {

    vec2 p = gl_FragCoord.xy / u_resolution;
    vec2 mouse = u_mouse / u_resolution;

    float lines = sin((p.y + u_time * 0.1) * 100.0) + clamp((p.y - 0.5) * 8.0 + sin(u_time) * 2.0, -6.0, 6.0);
    lines = step(0.1, lines);

    vec3 color = vec3(lines);

    gl_FragColor = vec4(color,1.0);
}
