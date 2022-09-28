#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define less(a,b,c)      mix(a,b,step(0.,c))
#define sabs(x,k) less((.5/k)*x*x+k*.5,abs(x),abs(x)-k)


vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
{
    return a + b*cos( 6.28318*(c*t+d) );
}


void main() {

    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;

    float t1 = ((sin(u_time * 0.2) + 1.0) * 0.5) + 0.8;

    vec2 c = vec2(-0.5, -0.5) * 1.0;
    vec2 u = vec2(p.x + sin(u_time * 0.2) * 0.5, p.y + sin(u_time * 0.01));
    for (int i = 0; i < 8; ++i) {
        float m = pow(dot(u * p * t1, u + abs(sin(u_time * 0.02))),0.3);
        u = sabs(u, (0.33 + 0.1 * p.y)) / m + c;
    }

    vec3 col = pal(u.x + u_time * 0.4, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.10,0.20));

    vec3 color = vec3(col);

    gl_FragColor = vec4(color,1.0);
}
