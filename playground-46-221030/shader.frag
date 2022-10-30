#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float line_segment(in vec2 p, in vec2 a, in vec2 b) {
	vec2 ba = b - a;
	vec2 pa = p - a;
	float h = clamp(dot(pa, ba) / dot(ba, ba), 0., 1.);
	return length(pa - h * ba);
}

vec2 rotateCW(vec2 p, float a)
{
	mat2 m = mat2(cos(a), -sin(a), sin(a), cos(a));
	return p * m;
}


void main() {

    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;

    float d = 0.0;

    float t = u_time * 0.2;

    for (float i = 0.0; i < 8.0; i++) {
        float line = line_segment(rotateCW(p, i * t), vec2(-i * 0.2 * sin(t), sin(p.y)), vec2(i * 0.2 * sin(t), sin(p.x)));
        line = 1.0 - step(0.02, line);

        d = d + line;
    }

    float c = length(p);

    c = 1.0 - step(0.4, c);

    d = d - c;

    vec3 color = vec3(d);

    gl_FragColor = vec4(color,1.0);
}
