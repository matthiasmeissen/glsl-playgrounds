#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float rect(vec2 uv, float size) {
    float s = (1.0 - size) * 0.5;

    vec2 lb = step(vec2(s), uv);
    vec2 tr = step(vec2(s), 1.0 - uv);

    float rect = lb.x * lb.y * tr.x * tr.y;

    return rect;
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    vec2 mouse = u_mouse / u_resolution;

    uv = uv - mouse + 0.5;

    float rect = rect(uv, sin(mouse.x * 3.14));

    vec3 color = vec3(mouse.x + uv.x, mouse.y, abs(sin(u_time * 2.0))) * vec3(rect);

    gl_FragColor = vec4(color,1.0);
}