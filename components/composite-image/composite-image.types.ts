export type ShaderTextureUniforms = {
  u_texture_1: { value: THREE.Texture };
  u_texture_2: { value: THREE.Texture };
  u_texture_3: { value: THREE.Texture };
  u_texture_4: { value: THREE.Texture };
  u_texture_5: { value: THREE.Texture };
  u_texture_6: { value: THREE.Texture };
};

export type ShaderColorUniformValue = [number, number, number, number];

export type ShaderColorUniforms = {
  u_color_1: { value: ShaderColorUniformValue };
  u_color_2: { value: ShaderColorUniformValue };
  u_color_3: { value: ShaderColorUniformValue };
  u_color_4: { value: ShaderColorUniformValue };
  u_color_5: { value: ShaderColorUniformValue };
  u_color_6: { value: ShaderColorUniformValue };
};

export type ShaderUniforms = ShaderTextureUniforms & ShaderColorUniforms;
