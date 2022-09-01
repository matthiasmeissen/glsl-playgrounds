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


    float line = lineDist(p - 0.5, vec2(-0.8, 0.0), vec2(0.8, 0.0), 0.01);

    float circle = sdCircle(p, 0.4);
    circle = step(0.2, circle);

    vec2 position = vec2(mod(0.8, sin(u_time * 0.2)), mod(sin(u_time), sin(u_time * 0.4)));
    float d = sdCircle(position, 0.6);
    vec3 col = mix(vec3(0.02), vec3(1.0,1.0,0.0), 1.0 - smoothstep(0.0, 0.005, abs(length(p - position) - abs(d)) - 0.0025));

    vec3 color = vec3(circle * col);

    gl_FragColor = vec4(color,1.0);
}
