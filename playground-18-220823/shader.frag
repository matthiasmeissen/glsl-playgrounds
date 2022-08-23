#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


void main() {

    vec2 p = gl_FragCoord.xy / u_resolution;
    vec2 mouse = u_mouse / u_resolution;

    float move = floor(abs(sin(u_time)) * 4.0);

    float circles = step(0.4, length(mod(p, move * 0.1) * 4.0 - p.x + step(0.1, sin(u_time)) * 0.2));

    circles = circles - step(0.8, length(mod(p, move * 0.2) * 4.0 - p.y + step(0.02, cos(u_time * 0.4)) * 0.2));

    float circles1 = circles - length(mod(p, move * 0.1) * 4.0 - p.y + step(0.02, cos(u_time * 0.4)) * 0.2);
    float circles2 = circles - length(mod(p, move * 0.2) * 8.0 - p.y + step(0.02, cos(u_time * 0.4)) * 0.2);

    vec3 color = vec3(circles, circles1, circles2);

    gl_FragColor = vec4(color,1.0);
}
