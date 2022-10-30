#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;



void main() {

    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;


    float t1 = abs(sin(p.x));
    float t2 = length(vec2(p.x, p.y * abs(sin(u_time))));

    for (float i = 0.0; i < 4.0; i++) {
        if (p.y > 0.0 && sin(u_time) > 0.2) {
            t1 = abs(sin(mod(p.x, 0.2)));
        } else {
            t1 = abs(sin(p.x));
        }
        t2 = length(vec2(p.x / i, p.y * sin(u_time * 0.2) * i));
    }

    float t = t1 / t2;


    float d = length(p);

    d = d + t;

    float steps = 2.0;
    d = mod(d - u_time * 0.04, 1.0 / steps) * steps;

    d = smoothstep(0.2, 0.19, d);


    vec3 color = vec3(d);

    gl_FragColor = vec4(color,1.0);
}
