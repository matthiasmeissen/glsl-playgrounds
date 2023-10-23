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
    vec2 p1 = (p * p + vec2(p.x, p.y * 0.2)) * 4.0;

    p1 = p1 * 8.0;

    p1 = rot(u_time * 0.4) * p1;

    float d1 = length(p * vec2(p1.y, p.x)) + fract(p1.y * p.y + u_time * 0.2);
    float d2 = length(p * vec2(p1.y * p.y, p.x)) + fract(p1.y * p.x + u_time * 0.2);

    float c1 = (p1.x * u_time) > 0.5 ? d1 : d2;

    vec3 col = vec3(c1);
    return col;
}


void main() {
    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;

    vec3 col1 = 1.0 - col1(p);

    vec3 color = vec3(col1);
    
    gl_FragColor = vec4(color,1.0);
}
