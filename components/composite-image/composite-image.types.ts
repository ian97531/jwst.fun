export type ShaderTextureUniforms = {
  u_texture_1: { value: THREE.Texture };
  u_texture_2: { value: THREE.Texture };
  u_texture_3: { value: THREE.Texture };
  u_texture_4: { value: THREE.Texture };
  u_texture_5: { value: THREE.Texture };
  u_texture_6: { value: THREE.Texture };
};

export type ShaderColorUniformValue = [number, number, number];

export type ShaderColorUniforms = {
  u_color_hsl_1: { value: ShaderColorUniformValue };
  u_color_hsl_2: { value: ShaderColorUniformValue };
  u_color_hsl_3: { value: ShaderColorUniformValue };
  u_color_hsl_4: { value: ShaderColorUniformValue };
  u_color_hsl_5: { value: ShaderColorUniformValue };
  u_color_hsl_6: { value: ShaderColorUniformValue };
};

export type ShaderUniforms = ShaderTextureUniforms & ShaderColorUniforms;
