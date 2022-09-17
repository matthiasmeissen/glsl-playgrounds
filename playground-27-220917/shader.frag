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


void main() {

    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;

    vec2 p1 = gl_FragCoord.xy / u_resolution;

    float speed = u_time * 0.02;

    float s1 = mod(abs(sin(speed)) * 4.0, p1.x);
    float s2 = mod(abs(cos(speed)) * 4.0, 1.0 - p1.x);

    float s3 = mod(abs(sin(speed)) * 4.0, p1.y);
    float s4 = mod(abs(cos(speed)) * 4.0, 1.0 - p1.y);

    float circle = float(s1 / s2 * s3 / s4);

    vec3 col = pal(circle, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.10,0.20));

    vec3 color = vec3(col);

    gl_FragColor = vec4(color,1.0);
}
