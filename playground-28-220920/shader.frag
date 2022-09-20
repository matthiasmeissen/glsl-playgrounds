#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


vec2 hash( vec2 p ){
    p = vec2(dot(p,vec2(127.1,311.7)),
             dot(p,vec2(269.5,183.3)));
    return fract(sin(p)*18.5453);
}

vec2 voronoi( in vec2 x ){
    vec2 n = floor( x );
    vec2 f = fract( x );

	vec3 m = vec3( 8.0 );
    for( int j=-1; j<=1; j++ )
    for( int i=-1; i<=1; i++ )
    {
        vec2  g = vec2( float(i), float(j) );
        vec2  o = hash( n + g );
	    vec2  r = g - f + (0.5+0.5*sin(u_time+6.2831*o));
		float d = dot( r, r );
        if( d<m.x )
            m = vec3( d, o );
    }

    return vec2( sqrt(m.x), m.y+m.z );
}

vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
{
    return a + b*cos( 6.28318*(c*t+d) );
}


void main() {

    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;


    p = gl_FragCoord.xy / max(u_resolution.x, u_resolution.y);
    
    vec2 vor = voronoi(p * 2.0);

    vec3 col1 = pal(vor.x + u_time * 0.4, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.10,0.20));
    vec3 col2 = vec3(smoothstep(0.0, 0.2, vor.y));

    vec3 col = col1 * col2;

    vec3 color = vec3(col);

    gl_FragColor = vec4(color,1.0);
}
