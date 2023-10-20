#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;



void main() {

    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;

    float t1 = length(p * atan(p.x * 40.0) * sin(u_time));
    float t2 = length(p + atan(p.x * 8.0) * cos(u_time));
    float t = step(0.4, t1) + step(0.4, t2);

    float l = smoothstep(0.2, 0.5, t1);

    for(float i = 0.0; i < 4.0; i++) {
        t = (t / i) * (1.0 - l * i);
    }

    vec3 color = vec3(t);

    gl_FragColor = vec4(color,1.0);
}
