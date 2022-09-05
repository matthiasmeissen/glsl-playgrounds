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

float lineDist(vec2 p, vec2 start, vec2 end, float width) {
	vec2 dir = start - end;
	float lngth = length(dir);
	dir /= lngth;
	vec2 proj = max(0.0, min(lngth, dot((start - p), dir))) * dir;
	return length( (start - p) - proj ) - (width / 2.0);
}

void main() {

    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;

    float circle = sdCircle(p, 0.4);

    float size = abs(sin(u_time * 0.2)) + 0.2;

    float line = lineDist(p, vec2(-size, 0.0), vec2(size, 0.0), 0.2);

    float line1 = lineDist(p, vec2(-size / 2.0, 0.0), vec2(size / 2.0, 0.0), 0.01);

    line1 = smoothstep(0.0, 0.02, line1);

    float shape = circle * line;

    vec3 col = pal(shape - u_time * 0.2, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.10,0.20));

    vec3 color = vec3(col);

    color = color / line1;

    gl_FragColor = vec4(color,1.0);
}
