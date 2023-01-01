varying vec2 v_uv;

uniform vec3 u_color_hsl_1;
uniform sampler2D u_texture_1;

uniform vec3 u_color_hsl_2;
uniform sampler2D u_texture_2;

uniform vec3 u_color_hsl_3;
uniform sampler2D u_texture_3;

uniform vec3 u_color_hsl_4;
uniform sampler2D u_texture_4;

uniform vec3 u_color_hsl_5;
uniform sampler2D u_texture_5;

uniform vec3 u_color_hsl_6;
uniform sampler2D u_texture_6;

// Color mixing math derived from https://gist.github.com/jashmenn/5328940
float blendScreen(float base, float blend) {
	return (1.0 - ((1.0 - base) * (1.0 - blend)));
}

vec3 blendScreen(vec3 base, vec3 blend) {
	return vec3(blendScreen(base.r, blend.r), 
							blendScreen(base.g, blend.g), 
							blendScreen(base.b, blend.b));
}

float hueToRgb(float f1, float f2, float hue) {
	if (hue < 0.0) hue += 1.0;
	else if (hue > 1.0) hue -= 1.0;

	float res;
	if ((6.0 * hue) < 1.0) res = f1 + (f2 - f1) * 6.0 * hue;
	else if ((2.0 * hue) < 1.0) res = f2;
	else if ((3.0 * hue) < 2.0) res = f1 + (f2 - f1) * ((2.0 / 3.0) - hue) * 6.0;
	else res = f1;
	return res;
}

vec3 rgbToHsl(vec3 color) {
	vec3 hsl;
	float fmin = min(min(color.r, color.g), color.b); //Min. value of RGB
	float fmax = max(max(color.r, color.g), color.b); //Max. value of RGB
	float delta = fmax - fmin; //Delta RGB value
	hsl.z = (fmax + fmin) / 2.0; // Luminance

	if (delta == 0.0)	{ //This is a gray, no chroma...
		hsl.x = 0.0;	// Hue
		hsl.y = 0.0;	// Saturation
	}
	else { //Chromatic data...
		if (hsl.z < 0.5) hsl.y = delta / (fmax + fmin); // Saturation
		else hsl.y = delta / (2.0 - fmax - fmin); // Saturation
		
		float deltaR = (((fmax - color.r) / 6.0) + (delta / 2.0)) / delta;
		float deltaG = (((fmax - color.g) / 6.0) + (delta / 2.0)) / delta;
		float deltaB = (((fmax - color.b) / 6.0) + (delta / 2.0)) / delta;

		if (color.r == fmax ) hsl.x = deltaB - deltaG; // Hue
		else if (color.g == fmax) hsl.x = (1.0 / 3.0) + deltaR - deltaB; // Hue
		else if (color.b == fmax) hsl.x = (2.0 / 3.0) + deltaG - deltaR; // Hue

		if (hsl.x < 0.0) hsl.x += 1.0; // Hue
		else if (hsl.x > 1.0) hsl.x -= 1.0; // Hue
	}

	return hsl;
}

vec3 hslToRgb(vec3 hsl) {
	vec3 rgb;
	if (hsl.y == 0.0) rgb = vec3(hsl.z); 
	else {
		float f2;
		if (hsl.z < 0.5)
			f2 = hsl.z * (1.0 + hsl.y);
		else
			f2 = (hsl.z + hsl.y) - (hsl.y * hsl.z);
		float f1 = 2.0 * hsl.z - f2;
		rgb.r = hueToRgb(f1, f2, hsl.x + (1.0/3.0));
		rgb.g = hueToRgb(f1, f2, hsl.x);
		rgb.b= hueToRgb(f1, f2, hsl.x - (1.0/3.0));
	}
	return rgb;
}

vec3 colorize(vec3 target, vec3 colorHsl) {
	vec3 targetHsl = rgbToHsl(target);
	vec3 colorizedHsl = vec3(colorHsl.r, colorHsl.g, targetHsl.b);
	return hslToRgb(colorizedHsl);
}

void main() {
	// Extract the base value from each texture for the current uv coordinate
	// and colorize each using the correct color unform.
  vec3 f_texture_1_color_rgb = colorize(texture(u_texture_1, v_uv.xy).rgb, u_color_hsl_1);
	vec3 f_texture_2_color_rgb = colorize(texture(u_texture_2, v_uv.xy).rgb, u_color_hsl_2);
	vec3 f_texture_3_color_rgb = colorize(texture(u_texture_3, v_uv.xy).rgb, u_color_hsl_3);
	vec3 f_texture_4_color_rgb = colorize(texture(u_texture_4, v_uv.xy).rgb, u_color_hsl_4);
	vec3 f_texture_5_color_rgb = colorize(texture(u_texture_5, v_uv.xy).rgb, u_color_hsl_5);
	vec3 f_texture_6_color_rgb = colorize(texture(u_texture_6, v_uv.xy).rgb, u_color_hsl_6);

	// Blend each layer with the layer before it.
	vec3 f_base_color_rgb = vec3(0, 0, 0);
	vec3 f_blend_1 = blendScreen(f_base_color_rgb, f_texture_1_color_rgb.rgb * u_color_hsl_1.z);
	vec3 f_blend_2 = blendScreen(f_blend_1, f_texture_2_color_rgb.rgb * u_color_hsl_2.z);
	vec3 f_blend_3 = blendScreen(f_blend_2, f_texture_3_color_rgb.rgb * u_color_hsl_3.z);
	vec3 f_blend_4 = blendScreen(f_blend_3, f_texture_4_color_rgb.rgb * u_color_hsl_4.z);
	vec3 f_blend_5 = blendScreen(f_blend_4, f_texture_5_color_rgb.rgb * u_color_hsl_5.z);
	vec3 f_blend_6 = blendScreen(f_blend_5, f_texture_6_color_rgb.rgb * u_color_hsl_6.z);

	// Gamma correction
  vec4 final_color_rgb = vec4(pow(f_blend_6.r, 1.0 / 2.2), pow(f_blend_6.g, 1.0 / 2.2), pow(f_blend_6.b, 1.0 / 2.2), 1);

  gl_FragColor = final_color_rgb;
}