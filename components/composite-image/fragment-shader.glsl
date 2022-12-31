varying vec2 v_uv;

uniform vec4 u_color;
uniform sampler2D u_layer_1;


// https://github.com/jamieowen/glsl-blend/blob/master/screen.glsl
float blendScreen(float base, float blend) {
	return 1.0-((1.0-base)*(1.0-blend));
}

vec3 blendScreen(vec3 base, vec3 blend) {
	return vec3(blendScreen(base.r,blend.r),blendScreen(base.g,blend.g),blendScreen(base.b,blend.b));
}

vec3 blendScreen(vec3 base, vec3 blend, float opacity) {
	return (blendScreen(base, blend) * opacity + base * (1.0 - opacity));
}

void main() {
  vec4 f_base_color = texture(u_layer_1, v_uv.xy);
  gl_FragColor = f_base_color * u_color;
}