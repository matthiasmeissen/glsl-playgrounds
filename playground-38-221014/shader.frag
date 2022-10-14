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

float lines (vec2 p) {
    float r = range(sin(u_time), vec2(-1.0, 1.0), vec2(0.8, 2.0));
    vec2 p1 = vec2(p.x * r, mod(p.y + u_time * 0.08, 1.0 / 4.0) * 4.0);
    float lines = p1.y + p1.x;

    return lines;
}

vec2 rotateCW(vec2 p, float a) {
	mat2 m = mat2(cos(a), -sin(a), sin(a), cos(a));
	return p * m;
}

vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
{
    return a + b*cos( 6.28318*(c*t+d) );
}


void main() {

    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;

    float l = lines(p);

    for (float i = 0.0; i < 4.0; i++) {
        if (p.x > length(p + sin(u_time * 0.2)) * sin(u_time)) {
            l = l * lines(p);
        }
    }

    float l1 = step(0.2, 1.0 - abs(l));
    l1 = cos(l1 + 0.2);

    vec3 col = pal(l, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.10,0.20));

    col = col - vec3(l1);

    vec3 color = vec3(col);

    gl_FragColor = vec4(color,1.0);
}
