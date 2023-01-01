varying vec2 v_uv;

uniform vec4 u_color_1;
uniform sampler2D u_texture_1;

uniform vec4 u_color_2;
uniform sampler2D u_texture_2;

uniform vec4 u_color_3;
uniform sampler2D u_texture_3;

uniform vec4 u_color_4;
uniform sampler2D u_texture_4;

uniform vec4 u_color_5;
uniform sampler2D u_texture_5;

uniform vec4 u_color_6;
uniform sampler2D u_texture_6;


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
	// Extract the base value from each texture for the current uv coordinate
	// and colorize each using the correct color unform.
  vec4 f_texture_1_color = texture(u_texture_1, v_uv.xy) * u_color_1;
	vec4 f_texture_2_color = texture(u_texture_2, v_uv.xy) * vec4(u_color_2.rgb, 1);
	vec4 f_texture_3_color = texture(u_texture_3, v_uv.xy) * vec4(u_color_3.rgb, 1);
	vec4 f_texture_4_color = texture(u_texture_4, v_uv.xy) * vec4(u_color_4.rgb, 1);
	vec4 f_texture_5_color = texture(u_texture_5, v_uv.xy) * vec4(u_color_5.rgb, 1);
	vec4 f_texture_6_color = texture(u_texture_6, v_uv.xy) * vec4(u_color_6.rgb, 1);

	// Blend each layer with the layer before it.
	vec3 f_blend_2 = blendScreen(f_texture_1_color.rgb, f_texture_2_color.rgb, f_texture_2_color.a);
	vec3 f_blend_3 = blendScreen(f_blend_2, f_texture_3_color.rgb, f_texture_3_color.a);
	vec3 f_blend_4 = blendScreen(f_blend_3, f_texture_4_color.rgb, f_texture_4_color.a);
	vec3 f_blend_5 = blendScreen(f_blend_4, f_texture_5_color.rgb, f_texture_5_color.a);
	vec3 f_final_color = blendScreen(f_blend_5, f_texture_6_color.rgb, f_texture_6_color.a);

  gl_FragColor = vec4(f_final_color, 1);
}