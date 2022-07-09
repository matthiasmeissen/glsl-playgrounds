#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


void main() {

    vec2 p = gl_FragCoord.xy / u_resolution;
    vec2 mouse = u_mouse / u_resolution;

    float s = abs(sin(u_time) * 0.02) + 0.001;
    float pos = abs(cos(u_time * 0.5)) * 0.4;

    float circle = length(vec2(mod(p.x, 0.2) * 4.0 - 0.5, p.y - 0.5));

    circle = step(pos - s, circle) - step(pos + s, circle);

    vec3 color = vec3(circle);

    gl_FragColor = vec4(color,1.0);
}
