#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    
    vec2 uv = gl_FragCoord.xy / u_resolution;

    vec2 mouse = u_mouse / u_resolution * 0.5;

    float posX = uv.x;

    posX = smoothstep(mouse.x, mouse.y, posX);

    vec3 color = vec3(uv.x, uv.y, abs(sin(u_time)));

    color = color + posX;

    gl_FragColor = vec4(color,1.0);
}
