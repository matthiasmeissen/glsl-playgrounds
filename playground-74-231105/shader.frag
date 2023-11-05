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


float grid(vec2 p, float width, float size, float number) {
    vec2 p1 = p * number;
    p1 = mod(p1 - 1.0, 2.0) - 1.0;
    float w = width * 0.1;
    float d1 = step(-w, p1.x) - step(w, p1.x);
    d1 += step(-w, p1.y) - step(w, p1.y);
    d1 = d1 - step(size, abs(p1.x)) - step(size, abs(p1.y));
    float col = d1;
    return col;
}


vec3 col1(vec2 p) {
    vec2 p1 = p * p * 2.0;
    p1 = rot(u_time * 0.4) * p1;

    float d1 = flowerSDF(p1 + p, 8.0);
    d1 = 1.0 - step(0.1, d1);

    float d2 = grid(p * p1, 0.1, (abs(sin(u_time)) + 0.2) * 0.8, 20.0) * 0.4;

    vec3 col = vec3(d1 * 2.0 + d2);
    return col;
}


void main() {
    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;

    vec3 col = col1(p);

    vec3 color = vec3(col);
    
    gl_FragColor = vec4(color,1.0);
}
