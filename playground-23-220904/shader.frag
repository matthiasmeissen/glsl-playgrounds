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

void main() {

    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;

    vec2 p1 = gl_FragCoord.xy / u_resolution;

    p1.x = p1.x + u_time * 0.2;

    vec3 col = pal(p1.x, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.33,0.67) );
    if( p1.y < (0.5) ) col = pal( p1.x, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.10,0.20) );

    float circle = sdCircle(p, 0.4);

    col = col - vec3(circle);

    vec3 color = vec3(col);

    gl_FragColor = vec4(color,1.0);
}
