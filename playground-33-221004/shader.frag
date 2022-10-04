#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float rand(float n) {
    return fract(sin(n) * 43758.5453123);
}

float noise1(float p) {
	float fl = floor(p);
	float fc = fract(p);
	return mix(rand(fl), rand(fl + 1.0), fc);
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

    float n = noise1(u_time * 0.4);
    float n1 = floor(n * 8.0);

    float n2 = 1.0;

    if (n > 0.5) {
        n2 = 3.141;
    } else {
        n2 = 3.141 * 0.25;
    }

    vec2 rp = rotateCW(p, n2);

    vec2 g1 = mod(rp, 1.0 / n1) * n1;
    vec2 g2 = mod(rp, n2);
    vec2 g = smoothstep(rand(floor(u_time)), 0.4, g1) * smoothstep(rand(floor(u_time * 0.2)), 0.8, g2);

    float t = g.x + g.y;

    vec3 col = pal(t, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.10,0.20));
    
    vec3 color = vec3(col);

    gl_FragColor = vec4(color,1.0);
}
