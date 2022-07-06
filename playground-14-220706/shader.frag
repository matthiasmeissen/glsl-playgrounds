#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {

    vec2 p = gl_FragCoord.xy / u_resolution;
    vec2 mouse = u_mouse / u_resolution;

    vec3 color1 = hsv2rgb(vec3(mod(u_time * 0.02, 1.0), 0.4, 1.0));

    float num = floor(mouse.x * 20.0);

    float circle = length(vec2(mod(p.x, 1.0 / num) * num - 0.5, mod(p.y, 1.0) - 0.5));

    circle = step(0.5 + sin(u_time) * 0.1, circle);

    vec3 color = vec3(circle);

    color = color * color1;

    gl_FragColor = vec4(color,1.0);
}
