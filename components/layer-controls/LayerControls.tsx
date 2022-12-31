import clsx from 'clsx';
import HueSlider from 'components/slider/HueSlider';
import LightnessSlider from 'components/slider/LightnessSlider';
import SaturationSlider from 'components/slider/SaturationSlider';
import React, { useCallback, useState } from 'react';

import styles from './LayerControls.module.css';

import type { LayerSettings } from "types/layer.types";

export type Props = {
  className?: string;
  layerSettings: LayerSettings;
  onUpdateLayerSettings?: (layerSettings: LayerSettings) => void;
};

const LayerControls = (props: Props) => {
  const { className, layerSettings, onUpdateLayerSettings } = props;
  const { hue, saturation, lightness } = layerSettings;

  const updateHue = useCallback(
    (updatedHue: number) => {
      onUpdateLayerSettings?.({ ...layerSettings, hue: updatedHue });
    },
    [layerSettings]
  );

  const updateSaturation = useCallback(
    (updatedSaturation: number) => {
      onUpdateLayerSettings?.({
        ...layerSettings,
        saturation: updatedSaturation,
      });
    },
    [layerSettings]
  );

  const updateLightness = useCallback(
    (updatedLightness: number) => {
      onUpdateLayerSettings?.({
        ...layerSettings,
        lightness: updatedLightness,
      });
    },
    [layerSettings]
  );

  return (
    <div className={clsx(styles.LayerControls, className)}>
      <span>Hue</span>
      <HueSlider
        hue={hue}
        saturation={saturation}
        lightness={lightness}
        onHueChange={updateHue}
      />
      <span>Saturation</span>
      <SaturationSlider
        hue={hue}
        saturation={saturation}
        lightness={lightness}
        onSaturationChange={updateSaturation}
      />
      <span>Lightness</span>
      <LightnessSlider
        hue={hue}
        saturation={saturation}
        lightness={lightness}
        onLightnessChange={updateLightness}
      />
    </div>
  );
};

export default LayerControls;
