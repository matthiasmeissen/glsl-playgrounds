#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float rect(vec2 uv, float size) {
    float left = step(size, uv.x);
    float right = step(size, 1.0 - uv.x);
    float top = step(size, 1.0 - uv.y);
    float bottom = step(size, uv.y);

    float rect = left * right * top * bottom;

    return rect;
}


void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    vec2 mouse = u_mouse / u_resolution;

    float rect = rect(uv, mouse.x * 0.5);

    vec3 color = vec3(1.0);

    if (mouse.x > 0.6) {
        color = vec3(1.0, rect, 1.0);
    } else if (mouse.x > 0.4) {
        color = vec3(rect, 1.0, 1.0);
    } else {
        color = vec3(rect);
    }


    gl_FragColor = vec4(color,1.0);
}
