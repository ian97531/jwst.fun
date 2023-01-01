export function hslToRgb(
  hueDegrees: number,
  saturationPercent: number,
  lightnessPercent: number
) {
  const lightness = lightnessPercent / 100;
  const saturation = saturationPercent / 100;

  const a = saturation * Math.min(lightness, 1 - lightness);
  const f = (n: number) => {
    const k = (n + hueDegrees / 30) % 12;
    return lightness - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  };
  return [f(0), f(8), f(4)];
}
