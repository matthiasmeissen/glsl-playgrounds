#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


#define PI 3.14159265359
#define rot(a) mat2(cos(a), -sin(a), sin(a), cos(a))

float sdOutline(float d, float size, float width) {
    return smoothstep(size, size + width * 4.0, d) - smoothstep(size + width, size + width * 4.0, d);
}

vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
{
    return a + b*cos( 6.28318*(c*t+d) );
}


vec3 col1(vec2 p) {
    vec2 p1 = vec2(p.x * p.x, p.y * 2.0);

    p1 = mod(p1 - 1.0, 2.0) - 1.0;

    float circle = 0.0;

    float d1 = 0.0;

    for (float i = 1.0; i < 10.0; i++) {
        p1 = rot(u_time * 0.04 * i) * p1;
        circle = length(p1 + p * p);

        d1 += sdOutline(circle, i * 0.04, 0.04);

        d1 += sdOutline(circle * p1.x, i * 0.02, 0.002);
    }

    vec3 col = vec3(d1);
    return col;
}


void main() {
    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;

    float d1 = col1(p).x;

    vec3 col = pal(d1 + 0.4, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.10,0.20));

    vec3 color = vec3(col);
    
    gl_FragColor = vec4(color,1.0);
}
