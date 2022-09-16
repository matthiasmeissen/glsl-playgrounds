#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
{
    return a + b*cos( 6.28318*(c*t+d) );
}

float sdCircle( in vec2 p, in float r )
{
    return length(p)-r;
}

vec2 rotateCW(vec2 p, float a)
{
	mat2 m = mat2(cos(a), -sin(a), sin(a), cos(a));
	return p * m;
}

void main() {

    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;

    float cirle = sdCircle(floor((mod(vec2(0.01, 4.0), rotateCW(p, u_time * 0.2)) + 0.05) * 20.0), abs(sin(u_time)) + 1.0);

    vec3 col = pal(cirle, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.10,0.20));

    if(p.y > 0.4 || p.y < -0.4) {
        col = vec3(1.0 - step(0.2, cirle));
    }


    vec3 color = vec3(col);

    gl_FragColor = vec4(color,1.0);
}
