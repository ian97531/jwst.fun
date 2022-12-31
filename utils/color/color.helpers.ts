export function hslToRgb(hue: number, saturation: number, lightness: number) {
  const normalizedLightness = lightness / 100;
  const normalizedSaturation = saturation / 100;

  const a =
    normalizedSaturation *
    Math.min(normalizedLightness, 1 - normalizedLightness);
  const f = (n: number) => {
    const k = (n + hue / 30) % 12;
    return normalizedLightness - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  };
  return [f(0), f(8), f(4)];
}
