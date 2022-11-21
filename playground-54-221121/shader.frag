#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


#define rot(d) mat2(cos(d), -sin(d), sin(d), cos(d))


vec2 mirror(in vec2 xy) {
    vec2 f = fract(xy);
    vec2 m = floor(mod(xy, 2.));
    vec2 fm = f * m;
    return f + m - fm * 2.;
}

float flowerSDF(vec2 st, int N) {
    st = st * 2.0;
    float r = length(st) * 2.0;
    float a = atan(st.y, st.x);
    float v = float(N) * 0.5;
    return 1.0 - (abs(cos(a * v)) *  0.5 + 0.5) / r;
}

float line(float s, float pos, float strength) {
    return float(step(pos - strength, s) - step(pos + strength, s));
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

    vec2 p1 = mirror(p * rot(u_time * 0.2));
    float t = atan(p1.y, p1.x);
    t = step(radians(abs(sin(u_time * 0.2)) * 90.0), t);

    float d = flowerSDF(p1 * range(sin(u_time * 0.2), vec2(-1.0, 1.0), vec2(0.2, 0.8)), 20);

    d = d + t;

    vec3 col = pal(d, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.10,0.20));

    col = col * vec3(line(d, sin(u_time * 0.4), 0.4));

    vec3 color = vec3(col);

    gl_FragColor = vec4(color,1.0);
}
