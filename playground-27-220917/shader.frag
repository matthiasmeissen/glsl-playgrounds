#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float sdCircle( in vec2 p, in float r ) 
{
    return length(p)-r;
}

vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
{
    return a + b*cos( 6.28318*(c*t+d) );
}

void main() {

    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;

    float circle1 = sdCircle(vec2(p.x, p.y - 1.0), abs(sin(u_time * 0.4)) * 2.0);
    float circle2 = sdCircle(vec2(p.x, p.y + 1.0), abs(cos(u_time * 0.2)) * 4.0);

    float circles = float(circle1 / circle2) - 0.2;

    circles = mod(4.0, circles);

    vec3 col = pal(circles, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.10,0.20));

    vec3 color = vec3(col);

    gl_FragColor = vec4(color,1.0);
}
