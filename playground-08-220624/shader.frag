#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_buffer0;
uniform sampler2D u_buffer1;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float circle(vec2 uv, vec2 pos) {
    float circle = 1.0 - smoothstep(0.0, 0.2, length(uv - pos));
    return circle;
}

#if defined(BUFFER_0)

void main() {
    vec2 p = gl_FragCoord.xy / u_resolution;
    vec2 mouse = u_mouse / u_resolution;

    vec3 color = vec3(mouse.x, 1.0, abs(sin(u_time)));

    vec3 buffer = texture2D(u_buffer1, p).rgb;
    buffer *= 0.98;

    float c = circle(p, mouse);
    buffer = mix(buffer, color, c * 1.0);
    gl_FragColor = vec4(buffer, 1.0);
}

#elif defined(BUFFER_1)

void main() {
    vec2 p = gl_FragCoord.xy / u_resolution;

    vec3 buffer = texture2D(u_buffer0, p).rgb;
    gl_FragColor = vec4(buffer, 1.0);
}

#else

void main() {
    vec2 p = gl_FragCoord.xy / u_resolution;

    vec3 color = vec3(0.0);
    
    vec3 b1 = texture2D(u_buffer1, p).rgb;
    color += b1;
    gl_FragColor = vec4(color, 1.0);
}

#endif
