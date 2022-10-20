#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float interpolate(float a0, float a1, float w) {
     if (0.0 > w) return a0;
     if (1.0 < w) return a1;        
    return (a1 - a0) * (3.0 - w * 2.0) * w * w + a0;
}

vec2 hash22(vec2 p)
{
    vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973));
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.xx + p3.yz) * p3.zy);
}

float dotGridGradient(float ix, float iy, float x, float y) {
    vec2 gradient = hash22(vec2(ix, iy));    
    float dx = x - ix;
    float dy = y - iy;    
    return (dx*gradient.x + dy*gradient.y);
}

float perlin(vec2 p) {
    float x0 = floor(p.x + sin(u_time));
    float x1 = x0 + 1.;
    float y0 = floor(p.y + sin(u_time * 0.2));
    float y1 = y0 + 1.;
    
    float sx = p.x - x0;
    
    float n0, n1, ix0, ix1, value;

    n0 = dotGridGradient(x0, y0, p.x, p.y);
    n1 = dotGridGradient(x1, y0, p.x, p.y);
    ix0 = interpolate(n0, n1, sx);

    return ix0 * 0.5 + 0.5; 
}


vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
{
    return a + b*cos( 6.28318*(c*t+d) );
}


void main() {

    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;
    
    float l = perlin(vec2(mod(2.0, p.x), p.y * 0.4));

    float c = length(p);

    c = step(0.8, c);

    float l1 = step(0.4, l);

    vec3 col = pal(l * u_time * 0.2, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.10,0.20));

    col = col - c / l1;

    vec3 color = vec3(col);

    gl_FragColor = vec4(color,1.0);
}
