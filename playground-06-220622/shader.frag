#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


void main() {

    vec2 p = gl_FragCoord.xy / u_resolution;
    vec2 q = p - vec2(0.5);

    vec3 color = vec3(sin(u_time), p.y, 0.4);

    float r = 0.2 + floor(sin(q.x * u_mouse.x * 0.4));
    color *= 1.0 - step(r, length(q));

    r = 0.2 + floor(sin(q.y * u_mouse.y * 0.4));
    color *= 1.0 - step(r, length(q));

    gl_FragColor = vec4(color,1.0);
}
