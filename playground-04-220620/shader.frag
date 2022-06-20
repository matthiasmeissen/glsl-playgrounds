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

    vec3 color = vec3(rect((uv - vec2(0.5)) / (mouse - 0.5), mouse.x));

    gl_FragColor = vec4(color,1.0);
}