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


    float s = 0.8;

    vec3 color1 = hsv2rgb(vec3(0.4, 1.0, 1.0));
    vec3 color2 = hsv2rgb(vec3(0.8, 1.0, 1.0));

    float shape = u_time * s - floor(length(cos(p) - vec2(0.5)) - u_time * s);
    shape = sin(shape);
    shape = abs(shape);

    vec3 color = vec3(1.0);
    
    color = mix(color1, color2, shape);

    gl_FragColor = vec4(color,1.0);
}
