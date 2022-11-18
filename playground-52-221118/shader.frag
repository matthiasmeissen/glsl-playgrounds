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

    float t = fract(mod(p.x, 0.2) + p.y + u_time * 0.1);

    float d = distance(p.x, sin(p.y + u_time)) - 0.4;

    float s = t - d;

    float s1 = step(0.4, s);
    float s2 = step(0.48, s);

    float l = s1 - s2;

    vec3 col = pal(s + u_time * 0.2, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.10,0.20));

    col = col * vec3(l);

    vec3 color = vec3(col);

    gl_FragColor = vec4(color,1.0);
}
