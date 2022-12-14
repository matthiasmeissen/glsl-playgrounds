#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;



void main() {

    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;

    vec2 p1 = fract(p * 10.0);
    float dots = 1.0 - step(0.02, length(p1 - 0.5));

    float lines = 1.0 - step(0.002, abs(p.y)) * step(0.002, abs(p.x));

    float c;

    for(float i = 0.0; i < 8.0; i ++) {    
        float s = fract(u_time * 0.4) * i;
        vec2 p2 = vec2(p.x, p.y - s);
        c += step(s - 0.01, length(p2)) - step(s, length(p2));
        
        vec2 p3 = vec2(p.x, p.y + s);
        c += step(s - 0.01, length(p3)) - step(s, length(p3));
    }


    float d = dots + lines + c;

    vec3 color = vec3(d);

    gl_FragColor = vec4(color,1.0);
}
