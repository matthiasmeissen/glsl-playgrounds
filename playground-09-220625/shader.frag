#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float circle(vec2 uv, float r, vec2 pos, float line) {
    float circle1 = 1.0 - step(r + line, length(uv - pos));
    float circle2 = 1.0 - step(r - line, length(uv - pos));
    
    float circle = circle1 - circle2;

    return circle;
}

void main() {

    vec2 p = gl_FragCoord.xy / u_resolution;
    vec2 mouse = u_mouse / u_resolution;

    float circle = circle(p, mouse.y * 0.4, vec2(p.y * abs(sin(u_time * 0.5)), p.x * p.y + 0.25), mouse.x * 0.04);

    vec3 color = vec3(circle);

    gl_FragColor = vec4(color,1.0);
}
