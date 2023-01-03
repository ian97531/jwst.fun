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
          hueDegrees: 245,
          saturationPercent: 75,
          lightnessPercent: 40,
          whiteValue: 100,
          blackValue: 31,
        },
      },
      {
        name: "F187N",
        wavelengthMicrons: 1.874,
        imageUrl: "https://dl4y979somvdi.cloudfront.net/jw02731/f187n.png",
        defaultConfig: {
          hueDegrees: 201,
          saturationPercent: 68,
          lightnessPercent: 40,
          whiteValue: 78,
          blackValue: 24,
        },
      },
      {
        name: "F200W",
        wavelengthMicrons: 1.99,
        imageUrl: "https://dl4y979somvdi.cloudfront.net/jw02731/f200w.png",
        defaultConfig: {
          hueDegrees: 241,
          saturationPercent: 71,
          lightnessPercent: 19,
          whiteValue: 61,
          blackValue: 17,
        },
      },
      {
        name: "F335M",
        wavelengthMicrons: 3.365,
        imageUrl: "https://dl4y979somvdi.cloudfront.net/jw02731/f335m.png",
        defaultConfig: {
          hueDegrees: 9,
          saturationPercent: 89,
          lightnessPercent: 42,
          whiteValue: 78,
          blackValue: 1,
        },
      },
      {
        name: "F444W",
        wavelengthMicrons: 4.421,
        imageUrl: "https://dl4y979somvdi.cloudfront.net/jw02731/f444w.png",
        defaultConfig: {
          hueDegrees: 350,
          saturationPercent: 91,
          lightnessPercent: 37,
          whiteValue: 67,
          blackValue: 18,
        },
      },
      {
        name: "F470N",
        wavelengthMicrons: 4.707,
        imageUrl: "https://dl4y979somvdi.cloudfront.net/jw02731/f470n.png",
        defaultConfig: {
          hueDegrees: 63,
          saturationPercent: 100,
          lightnessPercent: 50,
          whiteValue: 100,
          blackValue: 11,
        },
      },
    ],
  },
  jw02729: {
    name: "Tarantula Nebula",
    imageSizePixels: [13972, 8028],
    filters: [
      {
        name: "F090W",
        wavelengthMicrons: 0.901,
        imageUrl: "https://dl4y979somvdi.cloudfront.net/jw02729/f090w.png",
        defaultConfig: {
          hueDegrees: 0,
          saturationPercent: 100,
          lightnessPercent: 45,
          whiteValue: 86,
          blackValue: 0,
        },
      },
      {
        name: "F187N",
        wavelengthMicrons: 1.874,
        imageUrl: "https://dl4y979somvdi.cloudfront.net/jw02729/f187n.png",
        defaultConfig: {
          hueDegrees: 185,
          saturationPercent: 100,
          lightnessPercent: 47,
          whiteValue: 86,
          blackValue: 0,
        },
      },
      {
        name: "F200W",
        wavelengthMicrons: 1.99,
        imageUrl: "https://dl4y979somvdi.cloudfront.net/jw02729/f200w.png",
        defaultConfig: {
          hueDegrees: 54,
          saturationPercent: 100,
          lightnessPercent: 50,
          whiteValue: 77,
          blackValue: 19,
        },
      },
      {
        name: "F335M",
        wavelengthMicrons: 3.365,
        imageUrl: "https://dl4y979somvdi.cloudfront.net/jw02729/f335m.png",
        defaultConfig: {
          hueDegrees: 8,
          saturationPercent: 100,
          lightnessPercent: 41,
          whiteValue: 66,
          blackValue: 0,
        },
      },
      {
        name: "F444W",
        wavelengthMicrons: 4.421,
        imageUrl: "https://dl4y979somvdi.cloudfront.net/jw02729/f444w.png",
        defaultConfig: {
          hueDegrees: 221,
          saturationPercent: 72,
          lightnessPercent: 36,
          whiteValue: 74,
          blackValue: 0,
        },
      },
      {
        name: "F470N",
        wavelengthMicrons: 4.707,
        imageUrl: "https://dl4y979somvdi.cloudfront.net/jw02729/f470n.png",
        defaultConfig: {
          hueDegrees: 63,
          saturationPercent: 100,
          lightnessPercent: 0,
          whiteValue: 100,
          blackValue: 11,
        },
      },
    ],
  },
};
