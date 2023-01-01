import { Filter, FilterConfig } from 'data/observations.types';
import { hslToRgb } from 'utils/color/color.helpers';

import type {
  ShaderColorUniforms,
  ShaderColorUniformValue,
  ShaderTextureUniforms,
} from "components/composite-image/composite-image.types";
export const buildTextureUniforms = (
  textures: readonly THREE.Texture[],
  fallbackTexture: THREE.Texture
): ShaderTextureUniforms => ({
  u_texture_1: { value: textures[0] ?? fallbackTexture },
  u_texture_2: { value: textures[1] ?? fallbackTexture },
  u_texture_3: { value: textures[2] ?? fallbackTexture },
  u_texture_4: { value: textures[3] ?? fallbackTexture },
  u_texture_5: { value: textures[4] ?? fallbackTexture },
  u_texture_6: { value: textures[5] ?? fallbackTexture },
});

const buildShaderColorUniformForFilterConfig = (
  filterConfig: FilterConfig
): ShaderColorUniformValue => {
  const { hueDegrees, saturationPercent, lightnessPercent } = filterConfig;
  return [hueDegrees / 360, saturationPercent / 100, lightnessPercent / 100];
};

export const buildColorUniforms = (
  filterConfigs: readonly FilterConfig[],
  fallbackUniformValue: ShaderColorUniformValue = [0, 0, 0]
): ShaderColorUniforms => ({
  u_color_hsl_1: {
    value: filterConfigs[0]
      ? buildShaderColorUniformForFilterConfig(filterConfigs[0])
      : fallbackUniformValue,
  },
  u_color_hsl_2: {
    value: filterConfigs[1]
      ? buildShaderColorUniformForFilterConfig(filterConfigs[1])
      : fallbackUniformValue,
  },
  u_color_hsl_3: {
    value: filterConfigs[2]
      ? buildShaderColorUniformForFilterConfig(filterConfigs[2])
      : fallbackUniformValue,
  },
  u_color_hsl_4: {
    value: filterConfigs[3]
      ? buildShaderColorUniformForFilterConfig(filterConfigs[3])
      : fallbackUniformValue,
  },
  u_color_hsl_5: {
    value: filterConfigs[4]
      ? buildShaderColorUniformForFilterConfig(filterConfigs[4])
      : fallbackUniformValue,
  },
  u_color_hsl_6: {
    value: filterConfigs[5]
      ? buildShaderColorUniformForFilterConfig(filterConfigs[5])
      : fallbackUniformValue,
  },
});
