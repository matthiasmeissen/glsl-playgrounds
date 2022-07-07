#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


void main() {

    vec2 p = gl_FragCoord.xy / u_resolution;
    vec2 mouse = u_mouse / u_resolution;

    float repeat = sin(u_time) * 2.0;
    float line = 0.04;
    float pos = abs(sin(u_time));

    float circle = length(vec2(mod(p.x - 0.5 , 1.0 / repeat) * repeat, p.y - 0.5));

    circle = circle + step(pos - line, circle) - step(pos + line, circle);
    circle = circle + step(pos + 0.2 - line, circle) - step(pos + 0.2 + line, circle);

    vec3 color = vec3(circle);

    gl_FragColor = vec4(color,1.0);
}
