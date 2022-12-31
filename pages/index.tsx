import clsx from 'clsx';
import Slider from 'components/slider/Slider';
import Viewport from 'components/Viewport';
import Head from 'next/head';
import { useState } from 'react';
import styles from 'styles/index.module.css';
import { hslToRgb } from 'utils/color/color.helpers';

import { Inter } from '@next/font/google';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [hue, setHue] = useState<number[]>([0]);
  const [saturation, setSaturation] = useState<number[]>([1]);
  const [lightness, setLightness] = useState<number[]>([0.5]);

  const [red, green, blue] = hslToRgb(hue[0], saturation[0], lightness[0]);

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
        <Viewport
          className={styles.viewport}
          red={red}
          green={green}
          blue={blue}
        />

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
