import { Filter, FilterConfig } from 'data/observations.types';
import { hslToRgb } from 'utils/color/color.helpers';

import type {
  ShaderColorUniforms,
  ShaderColorUniformValue,
  ShaderLevelsUniforms,
  ShaderLevelsUniformValue,
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

const buildShaderLevelsUniformForFilterConfig = (
  filterConfig: FilterConfig
): ShaderLevelsUniformValue => {
  const { blackValue, whiteValue } = filterConfig;
  return [2.2, blackValue / 100, whiteValue / 100];
};

export const buildLevelsUniforms = (
  filterConfigs: readonly FilterConfig[],
  fallbackUniformValue: ShaderLevelsUniformValue = [2.2, 0, 1]
): ShaderLevelsUniforms => ({
  u_levels_1: {
    value: filterConfigs[0]
      ? buildShaderLevelsUniformForFilterConfig(filterConfigs[0])
      : fallbackUniformValue,
  },
  u_levels_2: {
    value: filterConfigs[1]
      ? buildShaderLevelsUniformForFilterConfig(filterConfigs[1])
      : fallbackUniformValue,
  },
  u_levels_3: {
    value: filterConfigs[2]
      ? buildShaderLevelsUniformForFilterConfig(filterConfigs[2])
      : fallbackUniformValue,
  },
  u_levels_4: {
    value: filterConfigs[3]
      ? buildShaderLevelsUniformForFilterConfig(filterConfigs[3])
      : fallbackUniformValue,
  },
  u_levels_5: {
    value: filterConfigs[4]
      ? buildShaderLevelsUniformForFilterConfig(filterConfigs[4])
      : fallbackUniformValue,
  },
  u_levels_6: {
    value: filterConfigs[5]
      ? buildShaderLevelsUniformForFilterConfig(filterConfigs[5])
      : fallbackUniformValue,
  },
});
