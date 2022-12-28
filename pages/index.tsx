import clsx from 'clsx';
import Head from 'next/head';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Inter } from '@next/font/google';

import Canvas from '../components/Canvas';
import Slider from '../components/slider/Slider';
import styles from '../styles/index.module.css';
import { hslToRgb } from '../utils/color/color.helpers';
import { createRandomGrayscaleImageData } from '../utils/image-edit/image-edit.helpers';
import { useImageEditWorker } from '../utils/image-edit/useImageEditWorker';

const inter = Inter({ subsets: ["latin"] });

const CANVAS_HEIGHT = 300;
const CANVAS_WIDTH = 500;

export default function Home() {
  const colorizedContextRef = useRef<CanvasRenderingContext2D>();
  const [imageData, setImageData] = useState<ImageData | null>(null);

  const [hue, setHue] = useState<number[]>([0]);
  const [saturation, setSaturation] = useState<number[]>([0]);
  const [lightness, setLightness] = useState<number[]>([0]);

  const imageWorker = useImageEditWorker();

  const drawColorized = useCallback(() => {
    const ctx = colorizedContextRef.current;
    if (!ctx) return;
  }, []);
  const mountOriginal = useCallback((ctx: CanvasRenderingContext2D) => {
    const newImageData = createRandomGrayscaleImageData(
      CANVAS_WIDTH,
      CANVAS_HEIGHT
    );
    setImageData(newImageData);
    //ctx.putImageData(newImageData, 0, 0);
  }, []);

  const mountColorized = useCallback((ctx: CanvasRenderingContext2D) => {
    colorizedContextRef.current = ctx;
  }, []);

  const [red, green, blue] = hslToRgb(hue[0], saturation[0], lightness[0]);

  useEffect(() => {
    console.log("effect");
    imageWorker
      ?.fetchTiff("image1", "/jw02731/jw02731_o001_t017_nircam_f187n.tiff")
      .then(() => {
        imageWorker.buildHistogramOfTiff("image1");
      });
  }, []);
  return (
    <>
      <Head>
        <title>JWST.fun</title>
        <meta
          name="description"
          content="An application for mixing and colorizing images from different wavelengths of light."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={clsx(inter.className, styles.main)}>
        <div className={styles.canvases}>
          <Canvas
            style={{
              border: `10px solid hsl(${hue[0]}, ${saturation[0] * 100}%, ${
                lightness[0] * 100
              }%)`,
            }}
            height={300}
            width={500}
            onMount={mountOriginal}
          />
          <Canvas
            style={{
              border: `10px solid rgb(${red * 255}, ${green * 255}, ${
                blue * 255
              })`,
            }}
            height={300}
            width={500}
            onMount={mountColorized}
          />
        </div>
        <div className={styles.controls}>
          <span>Hue</span>
          <Slider
            min={1}
            max={360}
            step={1}
            onValueChange={setHue}
            value={hue}
          />
          <span>Saturation</span>
          <Slider
            min={0}
            max={1}
            step={0.01}
            onValueChange={setSaturation}
            value={saturation}
          />
          <span>Lightness</span>
          <Slider
            min={0}
            max={1}
            step={0.01}
            onValueChange={setLightness}
            value={lightness}
          />
        </div>
      </main>
    </>
  );
}
