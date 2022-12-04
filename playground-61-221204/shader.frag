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


void main() {

    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;


    if(length(p) > 0.6) {
        p = p * 1.4;
    } else {
        p = mod(vec2(0.2, 0.1), p) + 0.2;
    }

    vec2 p1 = p * 0.4 * rot(u_time);
    float d = distance(p1.x, p1.y) * distance(-p.x, p.y);

    vec2 p2 = p * rot(u_time * 0.4);
    float s = step(0.4, length(p2.x)) - step(0.4, length(p2.y));

    float t = d / s + 0.4;

    vec3 col = pal(t, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.10,0.20));

    col = col * vec3(t);

    col = col / (step(0.2, d) + step(0.1, d));

    vec3 color = vec3(col);

    gl_FragColor = vec4(color,1.0);
}
