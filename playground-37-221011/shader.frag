#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


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

    vec2 l = vec2(p.x * p.y, p.x / p.y);

    for (float i = 0.0; i < 8.0; i++) {
        l = l * rotateCW(sin(u_time * 0.2) * i + p, u_time * 0.2);
        l = l * rotateCW(sin(u_time * 0.4) * i + l, u_time * 0.1);
    }

    l.x = l.x / 0.2 + 0.4;

    vec3 col = pal(l.x, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.10,0.20));

    float l1 = step(0.8, abs(l.x));

    col = col - l1;
    
    vec3 color = vec3(col);

    gl_FragColor = vec4(color,1.0);
}
