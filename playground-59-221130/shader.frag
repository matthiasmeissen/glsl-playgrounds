#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


#define rot(a) mat2(cos(a), -sin(a), sin(a), cos(a))


float line (vec2 p, float s) {
    float line = p.y > (0.0 - s) && p.y < (0.0 + s) ? 1.0 : 0.0;
    return line;
}

vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
{
    return a + b*cos( 6.28318*(c*t+d) );
}


void main() {

    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;

    float d;

    for (float i = 0.0; i < 20.0; i++) {
        vec2 r1 = vec2(p.x + i * 0.04, p.y / i) * rot(u_time);
        float l1 = line(r1, 0.002);

        vec2 r2 = vec2(p.x * i, p.y + i * 0.02) * rot(-u_time);
        float l2 = line(r2, 0.002);

        d = d + l1 + l2;
    }

    float s = length(p);
    d -= s;

    float s1 = length(p + u_time);

    vec3 col = pal(s1, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.10,0.20));

    col = col * vec3(d);

    vec3 color = vec3(col);

    gl_FragColor = vec4(color,1.0);
}
