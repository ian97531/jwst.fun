import * as Comlink from 'comlink';
import { decode } from 'tiff';

import type TiffIfd from "tiff/lib/tiffIfd";

const tiffFiles = new Map<string, TiffIfd>();
let context: OffscreenCanvasRenderingContext2D | null = null;

const fetchTiff = async (key: string, url: string): Promise<void> => {
  console.log("fetch tiff");
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const [tiff] = decode(arrayBuffer);
  tiffFiles.set(key, tiff);
};

const setOffscreenCanvas = (canvas: OffscreenCanvas) => {
  context =
    (canvas.getContext("2d") as OffscreenCanvasRenderingContext2D) ?? null;
};

const renderTiffToCanvas = (key: string) => {
  console.log("render tiff to canvas");
  const tiff = tiffFiles.get(key);
  if (!(tiff && context)) {
    console.log("missing context");
    return;
  }

  console.log("bits per sample", tiff.data.slice(0, 100));

  const grayData = tiff.data;
  const data: Uint8ClampedArray = new Uint8ClampedArray(grayData.length * 4);
  for (let i = 0; i < grayData.length; i++) {
    const index = i * 4;
    const value = grayData[i];
    data[index + 0] = value;
    data[index + 1] = value;
    data[index + 2] = value;
    data[index + 3] = 255;
  }

  const imageData = new ImageData(data, tiff.width, tiff.height, {
    colorSpace: "srgb",
  });

  context.putImageData(imageData, 0, 0);
};

const buildHistogramOfTiff = (key: string) => {
  console.log("build histogram");
  const tiff = tiffFiles.get(key);
  if (!tiff) {
    throw new Error("unknown key provide to buildHistogramOfTiff");
  }

  console.log("success");
};

const exports = {
  buildHistogramOfTiff,
  fetchTiff,
  renderTiffToCanvas,
  setOffscreenCanvas,
};
export type ImageEditWorker = typeof exports;
Comlink.expose(exports);
