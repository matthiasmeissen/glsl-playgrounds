#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define Rot(a) mat2(cos(a),-sin(a),sin(a),cos(a))


float waveCircle(vec2 p, float s, float numW, float amp, float deg, float thickness){
    float r = s+amp*cos(atan(p.y,p.x)*numW);
    float d = abs(length(p)-r)-thickness;    
    p*=Rot(radians(deg));
    r = s+amp*cos(atan(p.y,p.x)*numW);
    float d2 = abs(length(p)-r)-thickness;  
    d = min(d,d2);    
    return d;
}


float range(float val, vec2 i, vec2 o) {
    float r = o.x + ((o.y - o.x) / (i.y - i.x)) * (val - i.x);
    return r;
}


vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
{
    return a + b*cos( 6.28318*(c*t+d) );
}



void main() {

    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;

    float d1 = range(sin(u_time * 0.1), vec2(-1.0, 1.0), vec2(-2.0, 2.0));
    float d2 = range(sin(u_time * 0.1), vec2(-1.0, 1.0), vec2(0.2, 0.8));

    float t = waveCircle(p, 2.0, sin(u_time * 0.1) * 4.0, d2, u_time * 20.0, d1);

    vec3 col = pal(t, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.10,0.20));

    vec3 color = vec3(col);

    gl_FragColor = vec4(color,1.0);
}
