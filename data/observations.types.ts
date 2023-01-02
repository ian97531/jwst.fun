export type FilterConfig = {
  hueDegrees: number;
  saturationPercent: number;
  lightnessPercent: number;
  whiteValue: number;
  blackValue: number;
};

export type Filter = {
  name: string;
  wavelengthMicrons: number;
  imageUrl: string;
  defaultConfig: FilterConfig;
};

export type Observation = {
  name: string;
  imageSizePixels: [width: number, height: number];
  filters: readonly Filter[];
};
