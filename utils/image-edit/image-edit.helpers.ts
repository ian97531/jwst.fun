import { hslToRgb } from 'utils/color/color.helpers';

export const createRandomGrayscaleImageData = (
  width: number,
  height: number
): ImageData => {
  const arr = new Uint8ClampedArray(height * width * 4);

  for (let i = 0; i < arr.length; i += 4) {
    const num = Math.random() * 255;
    arr[i + 0] = num; // R value
    arr[i + 1] = num; // G value
    arr[i + 2] = num; // B value
    arr[i + 3] = 255; // A value
  }

  return new ImageData(arr, width, height);
};

export const colorizeImageData = (
  imageData: ImageData,
  hue: number,
  saturation: number,
  lightness: number
): ImageData => {
  const { height, width, data } = imageData;
  const [red, green, blue] = hslToRgb(hue, saturation, lightness);

  const arr = new Uint8ClampedArray(height * width * 4);
  for (let i = 0; i < data.length; i += 4) {
    arr[i + 0] = Math.floor(data[i + 0] * red); // R value
    arr[i + 1] = Math.floor(data[i + 1] * green); // G value
    arr[i + 2] = Math.floor(data[i + 2] * blue); // B value
    arr[i + 3] = 255; // A value
  }

  return new ImageData(arr, width, height);
};

const decodeTiff = () => {};
