#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float rect(vec2 uv, vec2 s, vec2 pos) {

    vec2 p = uv;

    p.x = p.x - pos.x + 0.5 - s.x * 0.5;
    p.y = p.y + pos.y - 0.5 + s.y * 0.5;

    float left = step(0.5 - s.x * 0.5, p.x);
    float right = step(0.5 - s.x * 0.5, 1.0 - p.x);
    float top = step(0.5 - s.y * 0.5, 1.0 - p.y);
    float bottom = step(0.5 - s.y * 0.5, p.y);

    float rect = left * right * top * bottom;

    return rect;
}


void main() {

    vec2 p = gl_FragCoord.xy / u_resolution;
    vec2 mouse = u_mouse / u_resolution;

    float rect1 = rect(p, vec2(mouse.x * 0.5, 0.2), vec2(mouse.x, 1.0 - mouse.y));
    float rect2 = rect(p, vec2(0.2, mouse.y * 0.5), vec2(mouse.y, 1.0 - mouse.x));

    vec3 color = mix(vec3(0.0, 0.2, 1.0), vec3(0.2, 1.0, 0.4), p.x);
    
    color = min(color, rect1 + rect2);

    gl_FragColor = vec4(color,1.0);
}
