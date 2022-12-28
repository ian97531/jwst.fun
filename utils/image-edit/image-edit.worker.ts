import * as Comlink from 'comlink';
import { decode } from 'tiff';

console.log("hello from the worker");

const tiffFiles = new Map<string, ArrayBuffer>();

const fetchTiff = async (key: string, url: string): Promise<void> => {
  console.log("fetch tiff");
  const response = await fetch(url);
  tiffFiles.set(key, await response.arrayBuffer());
};

const buildHistogramOfTiff = (key: string) => {
  console.log("build histogram");
  const tiff = tiffFiles.get(key);
  if (!tiff) {
    throw new Error("unknown key provide to buildHistogramOfTiff");
  }

  const decodedTiff = decode(tiff);
  console.log("success");
  console.log(decodedTiff.slice(0, 20));
};

const exports = {
  buildHistogramOfTiff,
  fetchTiff,
};
export type ImageEditWorker = typeof exports;
Comlink.expose(exports);
