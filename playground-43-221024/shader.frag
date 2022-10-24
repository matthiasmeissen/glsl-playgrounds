#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


const float PI = 3.14159265359;

float rand(float x, float y)
{
    return fract(sin(dot(vec2(x, y), vec2(12.9898, 78.233))) * 43758.5453);
}

vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
{
    return a + b*cos( 6.28318*(c*t+d) );
}


void main() {

    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;

    float t1 = atan(p.y, p.x) / PI / 2.0 + 0.5;
    float t2 = length(p);

    t2 = t2 * 4.0 - u_time;

    float t3 = floor(t2);

    float d = t1 * ceil(8.0 * rand(t3, 0.1));
    d += u_time * mix(-2.0, 2.0, rand(t3, 0.2)) * 0.4;

    float d1 = step(0.4, d);

    vec3 col = pal(d, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.10,0.20));

    col = col - vec3(d1);

    vec3 color = vec3(col);

    gl_FragColor = vec4(color,1.0);
}
