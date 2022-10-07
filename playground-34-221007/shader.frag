#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float rand(float n) {
    return fract(sin(n) * 43758.5453123);
}

vec2 rotateCW(vec2 p, float a) {
	mat2 m = mat2(cos(a), -sin(a), sin(a), cos(a));
	return p * m;
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

    vec2 p1 = rotateCW(vec2(p.x, p.y + rand(p.y) * 0.4), u_time * 0.1);

    float linesx = mod(p1.x - u_time * 0.2, 1.0);

    float r = range(sin(u_time), vec2(-1.0, 1.0), vec2(0.1, 0.9));

    linesx = smoothstep(0.0, r, linesx);

    vec3 col = pal(linesx, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.10,0.20));

    col = col - step(r, linesx);
    
    vec3 color = vec3(col);

    gl_FragColor = vec4(color,1.0);
}
