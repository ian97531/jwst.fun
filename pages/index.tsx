import Header from 'components/header/Header';
import LayerControls from 'components/layer-controls/LayerControls';
import Sidebar from 'components/sidebar/Sidebar';
import Viewport from 'components/viewport/Viewport';
import Head from 'next/head';
import { useState } from 'react';
import styles from 'styles/index.module.css';
import { LayerSettings } from 'types/layer.types';
import { hslToRgb } from 'utils/color/color.helpers';

const INITIAL_LAYER_SETTINGS: LayerSettings = {
  hue: 0,
  saturation: 100,
  lightness: 50,
  opacity: 1,
};

export default function Home() {
  const [layerSettings, setLayerSettings] = useState(INITIAL_LAYER_SETTINGS);

  const [red, green, blue] = hslToRgb(
    layerSettings.hue,
    layerSettings.saturation,
    layerSettings.lightness
  );

  return (
    <>
      <Head>
        <title>JWST.fun</title>
        <meta
          name="description"
          content="An application for mixing and colorizing images from different wavelengths of light."
        />
        <link rel="icon" href="/hexagon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className={styles.main}>
        <nav className={styles.nav}>
          <Header />

          <Sidebar>
            <LayerControls
              layerSettings={layerSettings}
              onUpdateLayerSettings={setLayerSettings}
            />
          </Sidebar>
        </nav>

        <Viewport
          className={styles.viewport}
          red={red}
          green={green}
          blue={blue}
        />
      </main>
    </>
  );
}
