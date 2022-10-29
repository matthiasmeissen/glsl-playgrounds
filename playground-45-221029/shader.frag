#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


const float pi = 3.1415926535898;
const float tau = pi * 2.0;


vec2 moda( vec2 p, float m, float r ) {
    p = vec2( (atan(p.y, p.x) + pi) / tau, length(p));
    p.x += r;
    p.x = ( fract( p.x * m ) - 0.5 ) * (pi / (m * 0.5));
    return p.y * vec2(cos(p.x), sin(p.x));
}

float range(float val, vec2 i, vec2 o) {
    float r = o.x + ((o.y - o.x) / (i.y - i.x)) * (val - i.x);
    return r;
}

vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
{
    return a + b*cos( 6.28318*(c*t+d) );
}


void main() {

    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;

    float d = range(sin(u_time * 0.4), vec2(-1.0, 1.0), vec2(0.4, 0.8));

    vec2 m = moda(p, 3.0, u_time * 0.02);

    float t = m.x + m.y;
    
    float r = step(0.02, mod(0.1, t));

    if (length(p) > d) {
        t = m.x - u_time * 0.4;
        t = t / r;
    }

    vec3 col = pal(t, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.10,0.20));

    vec3 color = vec3(col);

    gl_FragColor = vec4(color,1.0);
}
