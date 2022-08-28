#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float lineDist(vec2 p, vec2 start, vec2 end, float width) {
	vec2 dir = start - end;
	float lngth = length(dir);
	dir /= lngth;
	vec2 proj = max(0.0, min(lngth, dot((start - p), dir))) * dir;
	return length( (start - p) - proj ) - (width / 2.0);
}

vec2 rotateCW(vec2 p, float a)
{
	mat2 m = mat2(cos(a), -sin(a), sin(a), cos(a));
	return p * m;
}


void main() {

    vec2 p = gl_FragCoord.xy / u_resolution;
    vec2 mouse = u_mouse / u_resolution;

    vec2 position = vec2(mod(2.0, p.x), mod(2.0, p.y));

    float line = lineDist(rotateCW(position - 0.5, u_time * 0.4), vec2(-0.8, sin(u_time) * 0.2), vec2(0.8, 0.0), 0.01);

    line = step(0.2, line);

    vec3 color = vec3(line);

    gl_FragColor = vec4(color,1.0);
}
