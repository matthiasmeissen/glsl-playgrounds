#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define rot(a) mat2(cos(a), -sin(a), sin(a), cos(a))


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

    float t = range(sin(u_time * 0.4), vec2(-1.0, 1.0), vec2(0.1, 0.4));

    float d = length(p * t);
    vec2 p1 = mod(vec2(p), 2.0) * rot(u_time * 0.4);

    float r1 = (p1.x < 0.0) ? 0.2 : (p1.x > 0.2) ? 0.1 : 0.4;
    float r2 = (p1.y < 0.1) ? 0.1 : (p1.y > 0.3) ? 0.2 : 0.02;

    float s1 = smoothstep(r1, r1 + 0.1, d);
    float s2 = smoothstep(r2, r2 + 0.2, d);

    d = s1 + s2;

    d = step(0.1, d) - step(0.2, d) / d;

    vec3 col = pal(d + 0.4, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.10,0.20));

    vec3 color = vec3(col);

    gl_FragColor = vec4(color,1.0);
}
