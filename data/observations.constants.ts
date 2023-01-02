import type { Observation } from "data/observations.types";

export type ObservationId = keyof typeof OBSERVATIONS;

export const OBSERVATIONS: Record<string, Observation> = {
  jw02731: {
    name: "Carina Nebula - Cosmic Cliffs",
    imageSizePixels: [6943, 3997],
    filters: [
      {
        name: "F090W",
        wavelengthMicrons: 0.901,
        imageUrl: "https://dl4y979somvdi.cloudfront.net/jw02731/f090w.png",
        defaultConfig: {
          hueDegrees: 0,
          saturationPercent: 100,
          lightnessPercent: 50,
          whiteValue: 100,
          blackValue: 0,
        },
      },
      {
        name: "F187N",
        wavelengthMicrons: 1.874,
        imageUrl: "https://dl4y979somvdi.cloudfront.net/jw02731/f187n.png",
        defaultConfig: {
          hueDegrees: 0,
          saturationPercent: 100,
          lightnessPercent: 0,
          whiteValue: 100,
          blackValue: 0,
        },
      },
      {
        name: "F200W",
        wavelengthMicrons: 1.99,
        imageUrl: "https://dl4y979somvdi.cloudfront.net/jw02731/f200w.png",
        defaultConfig: {
          hueDegrees: 0,
          saturationPercent: 100,
          lightnessPercent: 0,
          whiteValue: 100,
          blackValue: 0,
        },
      },
      {
        name: "F335M",
        wavelengthMicrons: 3.365,
        imageUrl: "https://dl4y979somvdi.cloudfront.net/jw02731/f335m.png",
        defaultConfig: {
          hueDegrees: 0,
          saturationPercent: 100,
          lightnessPercent: 0,
          whiteValue: 100,
          blackValue: 0,
        },
      },
      {
        name: "F444W",
        wavelengthMicrons: 4.421,
        imageUrl: "https://dl4y979somvdi.cloudfront.net/jw02731/f444w.png",
        defaultConfig: {
          hueDegrees: 0,
          saturationPercent: 100,
          lightnessPercent: 0,
          whiteValue: 100,
          blackValue: 0,
        },
      },
      {
        name: "F470N",
        wavelengthMicrons: 4.707,
        imageUrl: "https://dl4y979somvdi.cloudfront.net/jw02731/f470n.png",
        defaultConfig: {
          hueDegrees: 0,
          saturationPercent: 100,
          lightnessPercent: 0,
          whiteValue: 100,
          blackValue: 0,
        },
      },
    ],
  },
};
