varying vec2 v_uv;

uniform vec3 u_color_hsl_1;
uniform vec3 u_levels_1;
uniform sampler2D u_texture_1;

uniform vec3 u_color_hsl_2;
uniform vec3 u_levels_2;
uniform sampler2D u_texture_2;

uniform vec3 u_color_hsl_3;
uniform vec3 u_levels_3;
uniform sampler2D u_texture_3;

uniform vec3 u_color_hsl_4;
uniform vec3 u_levels_4;
uniform sampler2D u_texture_4;

uniform vec3 u_color_hsl_5;
uniform vec3 u_levels_5;
uniform sampler2D u_texture_5;

uniform vec3 u_color_hsl_6;
uniform vec3 u_levels_6;
uniform sampler2D u_texture_6;

// Color mixing math derived from https://gist.github.com/jashmenn/5328940
float blend_screen(float base, float blend) {
	return (1.0 - ((1.0 - base) * (1.0 - blend)));
}

// Use the screen blend mode to combine the base and blend vectors provided.
vec3 blend_screen(vec3 base, vec3 blend) {
	return vec3(blend_screen(base.r, blend.r), blend_screen(base.g, blend.g), blend_screen(base.b, blend.b));
}

float hue_to_rgb(float float_1, float float_2, float hue) {
	if (hue < 0.0) hue += 1.0;
	else if (hue > 1.0) hue -= 1.0;

	float f_component;
	if ((6.0 * hue) < 1.0) f_component = float_1 + (float_2 - float_1) * 6.0 * hue;
	else if ((2.0 * hue) < 1.0) f_component = float_2;
	else if ((3.0 * hue) < 2.0) f_component = float_1 + (float_2 - float_1) * ((2.0 / 3.0) - hue) * 6.0;
	else f_component = float_1;
	return f_component;
}

// Convert the provided rgb values in the provided vec3 to hsl values in a vec3.
vec3 rgb_to_hsl(vec3 color) {
	vec3 f_hsl;
	float f_min = min(min(color.r, color.g), color.b); //Min. value of RGB
	float f_max = max(max(color.r, color.g), color.b); //Max. value of RGB
	float f_delta = f_max - f_min; //f_Delta RGB value
	f_hsl.z = (f_max + f_min) / 2.0; // Luminance

	if (f_delta == 0.0)	{ //This is a gray, no chroma...
		f_hsl.x = 0.0;	// Hue
		f_hsl.y = 0.0;	// Saturation
	}
	else { //Chromatic data...
		if (f_hsl.z < 0.5) f_hsl.y = f_delta / (f_max + f_min); // Saturation
		else f_hsl.y = f_delta / (2.0 - f_max - f_min); // Saturation
		
		float f_delta_r = (((f_max - color.r) / 6.0) + (f_delta / 2.0)) / f_delta;
		float f_delta_g = (((f_max - color.g) / 6.0) + (f_delta / 2.0)) / f_delta;
		float f_delta_b = (((f_max - color.b) / 6.0) + (f_delta / 2.0)) / f_delta;

		if (color.r == f_max ) f_hsl.x = f_delta_b - f_delta_g; // Hue
		else if (color.g == f_max) f_hsl.x = (1.0 / 3.0) + f_delta_r - f_delta_b; // Hue
		else if (color.b == f_max) f_hsl.x = (2.0 / 3.0) + f_delta_g - f_delta_r; // Hue

		if (f_hsl.x < 0.0) f_hsl.x += 1.0; // Hue
		else if (f_hsl.x > 1.0) f_hsl.x -= 1.0; // Hue
	}

	return f_hsl;
}

// Convert the provided hsl values in the provided vec3 to rgb values in a vec3.
vec3 hsl_to_rgb(vec3 hsl) {
	vec3 f_rgb;
	if (hsl.y == 0.0) f_rgb = vec3(hsl.z); 
	else {
		float f_float_2;
		if (hsl.z < 0.5)
			f_float_2 = hsl.z * (1.0 + hsl.y);
		else
			f_float_2 = (hsl.z + hsl.y) - (hsl.y * hsl.z);
		float f_float_1 = 2.0 * hsl.z - f_float_2;
		f_rgb.r = hue_to_rgb(f_float_1, f_float_2, hsl.x + (1.0/3.0));
		f_rgb.g = hue_to_rgb(f_float_1, f_float_2, hsl.x);
		f_rgb.b= hue_to_rgb(f_float_1, f_float_2, hsl.x - (1.0/3.0));
	}
	return f_rgb;
}

// Apply the hue and saturation from the provided color_hsl vec3 to the
// target_rgb color and return the colorized value as an rbg vec3.
vec3 colorize(vec3 target_rgb, vec3 color_hsl) {
	vec3 f_target_rgb_hsl = rgb_to_hsl(target_rgb);
	vec3 f_colorized_hsl = vec3(color_hsl.r, color_hsl.g, f_target_rgb_hsl.b);
	return hsl_to_rgb(f_colorized_hsl);
}

// Apply the provided gamma value to color vec3.
vec3 correct_gamma(vec3 color, float gamma)	{
	return vec3(pow(color.r, 1.0 / gamma), pow(color.g, 1.0 / gamma), pow(color.b, 1.0 / gamma));
}							

// Transform the black and white levels of the provided color using the gamma
// and min/max input and output colors provided.
vec3 adjust_levels(vec3 color, float gamma, vec3 min_input, vec3 max_input, vec3 min_output, vec3 max_output) {
	vec3 f_color_input_adjusted = min(max(color - vec3(min_input), vec3(0.0)) / (vec3(max_input) - vec3(min_input)), vec3(1.0));
	vec3 f_color_input_adjusted_gamma = correct_gamma(f_color_input_adjusted, 1.0);
	vec3 f_color_output_adjusted_gamma = mix(vec3(min_output), vec3(max_output), f_color_input_adjusted_gamma);
	return f_color_output_adjusted_gamma;
}

void main() {
	vec3 black_rgb = vec3(0);
	vec3 white_rgb = vec3(1);

	// Extract the base value from each texture for the current uv coordinate
	vec3 f_texture_1_gray_rgb = texture(u_texture_1, v_uv.xy).rgb;
	vec3 f_texture_2_gray_rgb = texture(u_texture_2, v_uv.xy).rgb;
	vec3 f_texture_3_gray_rgb = texture(u_texture_3, v_uv.xy).rgb;
	vec3 f_texture_4_gray_rgb = texture(u_texture_4, v_uv.xy).rgb;
	vec3 f_texture_5_gray_rgb = texture(u_texture_5, v_uv.xy).rgb;
	vec3 f_texture_6_gray_rgb = texture(u_texture_6, v_uv.xy).rgb;

	// Adjust the levels of each texture based on the gamma, white level and black
	// level provided for each texture.
	vec3 f_texture_1_gray_adjusted_levels_rgb = adjust_levels(f_texture_1_gray_rgb, u_levels_1.x, 
		vec3(u_levels_1.y), vec3(u_levels_1.z), black_rgb, white_rgb);
	vec3 f_texture_2_gray_adjusted_levels_rgb = adjust_levels(f_texture_2_gray_rgb, u_levels_2.x, 
		vec3(u_levels_2.y), vec3(u_levels_2.z), black_rgb, white_rgb);
	vec3 f_texture_3_gray_adjusted_levels_rgb = adjust_levels(f_texture_3_gray_rgb, u_levels_3.x, 
		vec3(u_levels_3.y), vec3(u_levels_3.z), black_rgb, white_rgb);
	vec3 f_texture_4_gray_adjusted_levels_rgb = adjust_levels(f_texture_4_gray_rgb, u_levels_4.x, 
		vec3(u_levels_4.y), vec3(u_levels_4.z), black_rgb, white_rgb);
	vec3 f_texture_5_gray_adjusted_levels_rgb = adjust_levels(f_texture_5_gray_rgb, u_levels_5.x, 
		vec3(u_levels_5.y), vec3(u_levels_5.z), black_rgb, white_rgb);
	vec3 f_texture_6_gray_adjusted_levels_rgb = adjust_levels(f_texture_6_gray_rgb, u_levels_6.x, 
		vec3(u_levels_6.y), vec3(u_levels_6.z), black_rgb, white_rgb);

	// Colorize each texture based on the hue and saturation provided for each texture.
  vec3 f_texture_1_colorized_rgb = colorize(f_texture_1_gray_adjusted_levels_rgb, u_color_hsl_1);
	vec3 f_texture_2_colorized_rgb = colorize(f_texture_2_gray_adjusted_levels_rgb, u_color_hsl_2);
	vec3 f_texture_3_colorized_rgb = colorize(f_texture_3_gray_adjusted_levels_rgb, u_color_hsl_3);
	vec3 f_texture_4_colorized_rgb = colorize(f_texture_4_gray_adjusted_levels_rgb, u_color_hsl_4);
	vec3 f_texture_5_colorized_rgb = colorize(f_texture_5_gray_adjusted_levels_rgb, u_color_hsl_5);
	vec3 f_texture_6_colorized_rgb = colorize(f_texture_6_gray_adjusted_levels_rgb, u_color_hsl_6);

	// Multiply each layer by the lightness input to adjust it's opacity. Then,
	// blend each layer with the layer before it using the screen blend mode.
	vec3 f_blend_1_rgb = blend_screen(black_rgb, f_texture_1_colorized_rgb * u_color_hsl_1.z);
	vec3 f_blend_2_rgb = blend_screen(f_blend_1_rgb, f_texture_2_colorized_rgb * u_color_hsl_2.z);
	vec3 f_blend_3_rgb = blend_screen(f_blend_2_rgb, f_texture_3_colorized_rgb * u_color_hsl_3.z);
	vec3 f_blend_4_rgb = blend_screen(f_blend_3_rgb, f_texture_4_colorized_rgb * u_color_hsl_4.z);
	vec3 f_blend_5_rgb = blend_screen(f_blend_4_rgb, f_texture_5_colorized_rgb * u_color_hsl_5.z);
	vec3 f_blend_6_rgb = blend_screen(f_blend_5_rgb, f_texture_6_colorized_rgb * u_color_hsl_6.z);

	// Return the color of the final texture layer at full opacity.
  gl_FragColor = vec4(f_blend_6_rgb, 1);
}