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

vec3 col1(vec2 p) {
    vec2 p1 = p * p * 2.0;
    p1 = rot(p1.x + u_time * 0.2) * p1;

    float d1 = length(sin(fract(p1) + u_time) * atan(p.y));
    float d2 = smoothstep(0.0, 0.2, d1);

    vec3 col = pal(d2 + 0.4, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.10,0.20));
    return col;
}

vec3 col2(vec2 p) {
    vec2 p1 = p * p;
    p1 *= rot(u_time * 0.4);

    float d1 = step(-0.2, p1.x);
    vec3 col = vec3(d1);
    return col;
}


void main() {
    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;

    vec3 col1 = col1(p);
    vec3 col2 = col2(p);
    vec3 col = col1 / col2;

    vec3 color = vec3(col);
    
    gl_FragColor = vec4(color,1.0);
}
