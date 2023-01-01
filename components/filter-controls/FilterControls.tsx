import clsx from 'clsx';
import HueSlider from 'components/slider/HueSlider';
import LightnessSlider from 'components/slider/LightnessSlider';
import SaturationSlider from 'components/slider/SaturationSlider';
import React, { useCallback, useState } from 'react';

import styles from './FilterControls.module.css';

import type { FilterConfig } from "data/observations.types";

export type Props = {
  className?: string;
  config: FilterConfig;
  name: string;
  onUpdateConfig?: (name: string, updatedConfig: FilterConfig) => void;
};

const FilterControls = (props: Props) => {
  const { className, config, name, onUpdateConfig } = props;
  const { hueDegrees, saturationPercent, lightnessPercent } = config;

  const updateHue = useCallback(
    (updatedHue: number) => {
      onUpdateConfig?.(name, {
        ...config,
        hueDegrees: updatedHue,
      });
    },
    [config, name]
  );

  const updateSaturation = useCallback(
    (updatedSaturation: number) => {
      onUpdateConfig?.(name, {
        ...config,
        saturationPercent: updatedSaturation,
      });
    },
    [config, name]
  );

  const updateLightness = useCallback(
    (updatedLightness: number) => {
      onUpdateConfig?.(name, {
        ...config,
        lightnessPercent: updatedLightness,
      });
    },
    [config, name]
  );

  return (
    <div className={clsx(styles.FilterControls, className)}>
      <h2 className={styles.title}>{name}</h2>
      <span>Hue</span>
      <HueSlider
        hueDegrees={hueDegrees}
        saturationPercent={saturationPercent}
        lightnessPercent={lightnessPercent}
        onHueChange={updateHue}
      />
      <span>Saturation</span>
      <SaturationSlider
        hueDegrees={hueDegrees}
        saturationPercent={saturationPercent}
        lightnessPercent={lightnessPercent}
        onSaturationChange={updateSaturation}
      />
      <span>Lightness</span>
      <LightnessSlider
        hueDegrees={hueDegrees}
        saturationPercent={saturationPercent}
        lightnessPercent={lightnessPercent}
        onLightnessChange={updateLightness}
      />
    </div>
  );
};

export default FilterControls;
