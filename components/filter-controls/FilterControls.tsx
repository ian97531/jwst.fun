import clsx from 'clsx';
import HueSlider from 'components/slider/HueSlider';
import LevelsSlider from 'components/slider/LevelsSlider';
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
  const {
    hueDegrees,
    saturationPercent,
    lightnessPercent,
    whiteValue,
    blackValue,
  } = config;

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

  const updateBlackValue = useCallback(
    (updatedBlackValue: number) => {
      onUpdateConfig?.(name, {
        ...config,
        blackValue: updatedBlackValue,
      });
    },
    [config, name]
  );

  const updateWhiteValue = useCallback(
    (updatedWhiteValue: number) => {
      onUpdateConfig?.(name, {
        ...config,
        whiteValue: updatedWhiteValue,
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
      <span>Opacity</span>
      <LightnessSlider
        hueDegrees={hueDegrees}
        saturationPercent={saturationPercent}
        lightnessPercent={lightnessPercent}
        onLightnessChange={updateLightness}
      />
      <span>Levels</span>
      <LevelsSlider
        blackValue={blackValue}
        whiteValue={whiteValue}
        onWhiteValueChange={updateWhiteValue}
        onBlackValueChange={updateBlackValue}
      />
    </div>
  );
};

export default FilterControls;
