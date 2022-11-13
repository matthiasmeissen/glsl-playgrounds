#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


vec2 rotateCW(vec2 p, float a)
{
	mat2 m = mat2(cos(a), -sin(a), sin(a), cos(a));
	return p * m;
}

float line (vec2 p, float r, bool blur) {
    float a = blur ? 0.0 : 0.0;
    float b = blur ? 0.4 : 0.1;
    return smoothstep(a, b, abs(p.x) - r);
}

vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
{
    return a + b*cos( 6.28318*(c*t+d) );
}



void main() {

    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;

    p = p * p;

    vec2 t = vec2(sin(u_time * 0.2), cos(u_time * 0.4 + cos(u_time * 0.2))) * 0.1;

    float d = line(rotateCW(p, u_time * 0.2), t.x, false);

    if (length(p) > p.x * abs((sin(u_time * 0.1) + 0.8))) {
        d = line(rotateCW(p, u_time * 0.2), t.y, true);
    }

    vec3 col = pal(d + 0.4, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.10,0.20));

    float r = step(0.1, d);

    col = col - vec3(d);
    col = col * r;

    vec3 color = vec3(col);

    gl_FragColor = vec4(color,1.0);
}
