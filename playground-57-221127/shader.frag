#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


#define rot(a) mat2(cos(a), -sin(a), sin(a), cos(a))


vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
{
    return a + b*cos( 6.28318*(c*t+d) );
}


void main() {

    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;


    float t1 = fract(p.x - u_time * 0.2) + mod(2.0, p.y);

    vec2 p1 = p * rot(u_time * 0.2);
    float t2 = fract(p1.y - u_time * 0.2) + mod(2.0, p1.x);

    float t = length(p) > 0.8 ? t1 : t2;

    float s = length(p) > 0.6 ? fract(t) - mod(abs(sin(u_time * 0.4)) + 0.2, t) : t;

    vec3 col = pal(s, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.10,0.20));

    col = length(mod(p * rot(u_time * 0.2), 4.0)) > 0.9 ? vec3(s) : col;

    vec3 color = vec3(col);

    gl_FragColor = vec4(color,1.0);
}
