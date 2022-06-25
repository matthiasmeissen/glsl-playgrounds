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

    vec3 color = vec3(0.0);

    for(float i = 0.0; i < 10.0; i++) {
        for(float j = 0.0; j < 10.0; j++) {
            color += vec3(rect(p, vec2(abs(sin(u_time)) * 0.1), vec2(i / 10.0, j / 10.0)));
        }
    }

    color *= mix(vec3(p.x, p.y, mouse.y), vec3(p.y, p.x, mouse.y), p.y);

    gl_FragColor = vec4(color,1.0);
}
