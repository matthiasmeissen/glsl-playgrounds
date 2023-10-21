#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


#define rot(a) mat2(cos(a), -sin(a), sin(a), cos(a))

vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
{
    return a + b*cos( 6.28318*(c*t+d) );
}

float line1(vec2 p, vec2 a, vec2 b, float r) {
	vec2 g = a - b;
    float d = abs(dot(normalize(vec2(g.y, -g.x)), p - a));
	return smoothstep(r, 0.2*r, d);
}

float line2(vec2 p, vec2 a, vec2 b) {
	vec2 g = a - b;
    float d = abs(dot(normalize(vec2(g.y, -g.x)), p - a));
	return step(0.98, d);
}

vec3 col1(vec2 p) {
    vec2 p1 = p * p + sin(u_time * 0.4) * 0.2;
    p1 = rot(u_time * 0.2) * p1 + p.y;

    float d1 = 0.0;
    float d2 = 0.0;

    for (float i = 0.0; i < 4.0; i++) {
        d1 += line1(p1, vec2(0.0, sin(i + u_time * 0.4)), vec2(sin(20.0 * p.x * p1.y), 0.0), 0.004);
    }

    for (float i = 0.0; i < 20.0; i++) {
        d2 += line2(p1, vec2(0.0, sin(i + u_time * 0.4)), vec2(sin(20.0 * p.x * p1.y / p1.x), 0.0));
    }

    vec3 col = vec3(d1 + d2);
    return col;
}


void main() {
    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;

    vec3 col1 = 1.0 - col1(p);

    vec3 color = vec3(col1);
    
    gl_FragColor = vec4(color,1.0);
}
