#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


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

    float r = length(p * p) * abs(sin(u_time * 0.4));

    for (float i = 0.0; i < 3.0; i++) {
        r = r - p.y * mod(u_time * 0.4, 2.0);
        r = r + p.y / mod(u_time * 0.4, 2.0);
    }

    float l = mod(p.y, 1.0 / 2.0) * 4.0;
    float l1 = mod(p.x, 1.0 / 2.0) * 8.0;
    float l2 = mod(-p.x, 1.0 / 2.0) * 8.0;

    float c = length(vec2(p.x * 0.6, p.y)) * 0.8;

    float rl = abs(r * l * l1 * l2) + c;

    vec3 col = pal(rl, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.10,0.20));

    float s = range(sin(u_time), vec2(-1.0, 1.0), vec2(0.0, 0.8));

    float t1 = smoothstep(0.8, 0.81, rl);
    float t2 = smoothstep(0.81, 0.82, rl);

    float t = (t1 - t2) * sin(u_time);

    col = col - step(mod(s, 2.0), rl) + t;
    
    vec3 color = vec3(col);

    gl_FragColor = vec4(color,1.0);
}
