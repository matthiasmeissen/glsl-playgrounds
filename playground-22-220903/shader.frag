#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float sdQuad( in vec2 p, in vec2 p0, in vec2 p1, in vec2 p2, in vec2 p3 )
{
	vec2 e0 = p1 - p0; vec2 v0 = p - p0;
	vec2 e1 = p2 - p1; vec2 v1 = p - p1;
	vec2 e2 = p3 - p2; vec2 v2 = p - p2;
	vec2 e3 = p0 - p3; vec2 v3 = p - p3;

	vec2 pq0 = v0 - e0*clamp( dot(v0,e0)/dot(e0,e0), 0.0, 1.0 );
	vec2 pq1 = v1 - e1*clamp( dot(v1,e1)/dot(e1,e1), 0.0, 1.0 );
	vec2 pq2 = v2 - e2*clamp( dot(v2,e2)/dot(e2,e2), 0.0, 1.0 );
    vec2 pq3 = v3 - e3*clamp( dot(v3,e3)/dot(e3,e3), 0.0, 1.0 );
    
    vec2 ds = min( min( vec2( dot( pq0, pq0 ), v0.x*e0.y-v0.y*e0.x ),
                        vec2( dot( pq1, pq1 ), v1.x*e1.y-v1.y*e1.x )),
                   min( vec2( dot( pq2, pq2 ), v2.x*e2.y-v2.y*e2.x ),
                        vec2( dot( pq3, pq3 ), v3.x*e3.y-v3.y*e3.x ) ));

    float d = sqrt(ds.x);

	return (ds.y>0.0) ? -d : d;
}


void main() {

    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 mouse = (2.0 * u_mouse - u_resolution) / u_resolution.y;

    vec2 v1 = 0.8 * cos(u_time + vec2(0.0, 0.2) - 0.4);
    vec2 v2 = 0.8 * cos(u_time + vec2(-0.4, 0.2) + sin(u_time));
    vec2 v3 = 0.8 * cos(u_time + vec2(-0.2, 0.6) + 2.4);
    vec2 v4 = 0.8 * cos(u_time + vec2(0.2, -0.4) + sin(u_time));

    float d = sdQuad(p, v1, v2, v3, v4);

    float col = 1.0 - smoothstep(0.0,0.8,abs(d));
    col = abs(sin(u_time * 0.4 + d));
    col = step(0.4, mod(2.0, col));

    vec3 color = vec3(col);

    gl_FragColor = vec4(color,1.0);
}
