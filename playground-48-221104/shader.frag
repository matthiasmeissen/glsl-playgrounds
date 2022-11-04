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

vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
{
    return a + b*cos( 6.28318*(c*t+d) );
}



void main() {

    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;


    vec2 p1 = rotateCW(p, 3.14 * 0.5);

    float t1 = fract((p1.x + sin(u_time * 0.2)) / p1.y * 2.0);
    float t2 = fract((p1.x - cos(u_time * 0.2)) * p1.y * 2.0);

    float t = t1 * t2 * 2.0;

    vec3 col = pal(t, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.10,0.20));

    col = col - vec3(length(p));

    vec3 color = vec3(col);

    gl_FragColor = vec4(color,1.0);
}
