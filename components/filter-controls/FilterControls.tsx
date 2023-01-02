import clsx from 'clsx';
import ButtonSwitch from 'components/button-switch/ButtonSwitch';
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
  disable?: boolean;
  isolateFilter?: boolean;
  name: string;
  onToggleIsolateFilter?: (name: string, newValue: boolean) => void;
  onUpdateConfig?: (name: string, updatedConfig: FilterConfig) => void;
};

const FilterControls = (props: Props) => {
  const {
    className,
    config,
    disable,
    isolateFilter,
    name,
    onToggleIsolateFilter,
    onUpdateConfig,
  } = props;
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

  const toggleIsolateFilter = useCallback(
    (newValue: boolean) => {
      onToggleIsolateFilter?.(name, newValue);
    },
    [name, onToggleIsolateFilter]
  );

  return (
    <div className={clsx(styles.FilterControls, className)}>
      <h2
        className={clsx(
          styles.name,
          styles.mayDisable,
          disable && styles.disable
        )}
      >
        {name}
      </h2>
      <ButtonSwitch
        className={styles.isolateButton}
        on={isolateFilter}
        onToggle={toggleIsolateFilter}
        variant="small"
      >
        Isolate
      </ButtonSwitch>
      <span className={clsx(styles.mayDisable, disable && styles.disable)}>
        Levels
      </span>
      <LevelsSlider
        className={clsx(styles.mayDisable, disable && styles.disable)}
        disabled={disable}
        blackValue={blackValue}
        whiteValue={whiteValue}
        onWhiteValueChange={updateWhiteValue}
        onBlackValueChange={updateBlackValue}
      />
      <span className={clsx(styles.mayDisable, disable && styles.disable)}>
        Hue
      </span>
      <HueSlider
        className={clsx(styles.mayDisable, disable && styles.disable)}
        disabled={disable}
        hueDegrees={hueDegrees}
        saturationPercent={saturationPercent}
        lightnessPercent={lightnessPercent}
        onHueChange={updateHue}
      />
      <span className={clsx(styles.mayDisable, disable && styles.disable)}>
        Saturation
      </span>
      <SaturationSlider
        className={clsx(styles.mayDisable, disable && styles.disable)}
        disabled={disable}
        hueDegrees={hueDegrees}
        saturationPercent={saturationPercent}
        lightnessPercent={lightnessPercent}
        onSaturationChange={updateSaturation}
      />
      <span className={clsx(styles.mayDisable, disable && styles.disable)}>
        Opacity
      </span>
      <LightnessSlider
        className={clsx(styles.mayDisable, disable && styles.disable)}
        disabled={disable}
        hueDegrees={hueDegrees}
        saturationPercent={saturationPercent}
        lightnessPercent={lightnessPercent}
        onLightnessChange={updateLightness}
      />
    </div>
  );
};

export default FilterControls;
