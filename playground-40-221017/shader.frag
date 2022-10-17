#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


#define rot(a) mat2(cos(a + vec4(0, 22, 8, 20))) 


vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
{
    return a + b*cos( 6.28318*(c*t+d) );
}


void main() {

    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;
    

    vec3 p1 = vec3(4.0, p * 2.0);
    vec3 g = p1;

    p1.xy *= rot(u_time * 0.2);

    float d = dot(sin(p1 * 0.4) * cos(p1).yzx, vec3(1.0)) * dot(sin(g * u_time * 0.2) * cos(g / 0.2).yzx, vec3(1.0));

    d = abs(mod(d, 4.0) - 0.2) * 5.0;

    float d1 = smoothstep(0.2, 1.0, d);

    vec3 col = pal(d + u_time * 0.4, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.10,0.20));

    col = col - vec3(d1);

    vec3 color = vec3(col);

    gl_FragColor = vec4(color,1.0);
}
