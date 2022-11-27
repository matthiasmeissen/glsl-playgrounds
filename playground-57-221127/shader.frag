#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


#define rot(a) mat2(cos(a), -sin(a), sin(a), cos(a))
#define PI 3.14159265359


float udSegment( in vec2 p, in vec2 a, in vec2 b )
{
    vec2 ba = b-a;
    vec2 pa = p-a;
    float h =clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );
    return length(pa-h*ba);
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

    float s1 = range(sin(u_time * 0.8), vec2(-1.0, 1.0), vec2(-0.8, 0.8));

    float d1 = 0.0;
    float d2 = 0.0;

    for (float i = 1.0; i < 9.0; i++) {
        vec2 p1 = p * rot(radians((360.0 / 9.0 * i) * u_time * 0.2));
        float t = udSegment(p1, vec2(s1 * sin(u_time * 0.4), -s1), vec2(0.6, s1));
        float t1 = 1.0 - step(0.04, t);
        d1 += t1;
    }

    for (float i = 1.0; i < 9.0; i++) {
        vec2 p1 = p * rot(radians((360.0 / 9.0 * i) * u_time * 0.2));
        float t = udSegment(p1, vec2(s1 * sin(u_time * 0.4), -s1), vec2(0.6, s1));
        float t1 = 1.0 - smoothstep(0.0, 0.04, t);
        d2 += t1;
    }

    vec3 col = pal(d2 + 0.4, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.10,0.20));

    col = col * vec3(d1);

    vec3 color = vec3(col);

    gl_FragColor = vec4(color,1.0);
}
