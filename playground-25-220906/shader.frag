#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
{
    return a + b*cos( 6.28318*(c*t+d) );
}

void main() {

    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;

    float PI = 3.141;

    float size = 0.5;

    float modulation = (sin(u_time * 0.02) * 0.2) + 0.2;
    
    vec2  pa = smoothstep(0.0, 2.0, size + cos(2.0 * PI * p * modulation));

    vec3 col1 = pal(pa.x * u_time, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.10,0.20));

    vec3 col2 = pal(pa.y * u_time, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.10,0.20));

    vec3 color = vec3(col1 + col2);

    color = 1.0 - color;

    gl_FragColor = vec4(color,1.0);
}
