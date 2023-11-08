#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


#define PI 3.14159265359
#define rot(a) mat2(cos(a), -sin(a), sin(a), cos(a))

float sdOutline(float d, float size, float width) {
    return step(size, d) - step(size + width, d);
}

float flowerSDF(vec2 st, float N) {
    st = st * 2.0;
    float r = length(st);
    float a = atan(st.y, st.x);
    float v = float(N) * 0.5;
    return 1.0 - (abs(cos(a * v)) *  0.5 + 0.5) / r;
}


float grid(vec2 p, float number) {
    vec2 p1 = p * number;
    p1 = mod(p1 - 1.0, 2.0) - 1.0;
    p1 = rot(u_time * 0.4) * p1;

    float d1 = flowerSDF(p1 * p * (abs(sin(u_time) * 2.0 + 0.4)), 8.0);

    float d2 = flowerSDF(p1 * p * (abs(sin(u_time + 0.4) * 2.0 + 0.4)), 8.0);

    d1 = sdOutline(d1, 0.4, 0.02);

    d2 = step(sin(u_time * 0.2), d2);

    float col = d1 + d2;
    return col;
}


vec3 col1(vec2 p) {
    vec2 p1 = p * p * 2.0;
    p1 = rot(u_time * 0.4) * p1;

    float d1 = grid(p, 8.0);

    vec3 col = vec3(d1);
    return col;
}


void main() {
    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;

    vec3 col = col1(p);

    vec3 color = vec3(col);
    
    gl_FragColor = vec4(color,1.0);
}
