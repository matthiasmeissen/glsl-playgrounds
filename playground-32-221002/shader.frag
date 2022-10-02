#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.1415926535897932384626433832795
#define rot(a)  mat2(cos(a),sin(a), -sin(a),cos(a))


vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
{
    return a + b*cos( 6.28318*(c*t+d) );
}


void main() {

    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;
    
    float l = length(vec2(p.x + sin(u_time * 0.1) * 2.0, p.y + cos(u_time * 0.1) * 2.0));
    p *= rot( l + u_time * 0.04);
    p *= p / l * 2.0;
        
    for( int i = 0; i < 3; i++){
        float v = length( mod(p, 0.5) - p.x * 0.25 );
        p.y *= ((sin( v * 5.0) ) * 0.5) * ((sin(u_time - length(p) * 0.5 ) + PI));
    }

    vec3 col = pal(p.y, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.10,0.20));

    float col1 = step(0.4, p.y);

    col = col * col1;

    vec3 color = vec3(col);

    gl_FragColor = vec4(color,1.0);
}
