#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float noise (vec2 uv, float factor) {
    float o = 0.0;

    uv = uv * 0.4;
    
    for(int i = 0; i < 5; i++) {
        uv *= -factor * factor;
        uv += sin(uv.yx * factor) / factor + u_time * 0.04;
        o += cos(uv.x - uv.y) + sin(uv.y - uv.x + o);
    }
    
    return o;
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

    float s = range(sin(u_time * 0.1), vec2(-1.0, 1.0), vec2(1.4, 1.8));

    float n = noise(vec2(p.x, p.y + u_time * 0.02), s);

    float n1 = step(0.2, n);

    vec3 col = pal(n, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.10,0.20));

    col = col * n1;

    vec3 color = vec3(col);

    gl_FragColor = vec4(color,1.0);
}
