import clsx from 'clsx';
import React, { useMemo } from 'react';

import * as RadixSlider from '@radix-ui/react-slider';

import styles from './Slider.module.css';

export type Props = Omit<RadixSlider.SliderProps, "value" | "onValueChange"> & {
  className?: string;
  hueDegrees: number;
  saturationPercent: number;
  lightnessPercent: number;
  onLightnessChange: (value: number) => void;
};

const LightnessSlider = (props: Props) => {
  const {
    className,
    hueDegrees,
    saturationPercent,
    lightnessPercent,
    onLightnessChange,
    min = 0,
    max = 50,
    step = 1,
    ...sliderProps
  } = props;

  const valueProps = useMemo(
    () => ({
      value: [lightnessPercent],
      onValueChange: (value: number[]) => onLightnessChange(value[0]),
    }),
    [lightnessPercent, onLightnessChange]
  );

  const trackStyle = useMemo(
    () => ({
      background: `linear-gradient(to right, 
          hsl(${hueDegrees}, ${saturationPercent}%, 0%) 0%, 
          hsl(${hueDegrees}, ${saturationPercent}%, 50%) 50%`,
    }),
    [hueDegrees, saturationPercent]
  );

  const thumbStyle = useMemo(
    () => ({
      backgroundColor: `hsl(${hueDegrees}, ${saturationPercent}%, ${lightnessPercent}%)`,
    }),
    [hueDegrees, saturationPercent, lightnessPercent]
  );

  return (
    <RadixSlider.Root
      className={clsx(styles.SliderRoot, className)}
      min={min}
      max={max}
      step={step}
      {...sliderProps}
      {...valueProps}
    >
      <RadixSlider.Track className={styles.SliderTrack} style={trackStyle}>
        <RadixSlider.Range className={styles.SliderRange} />
      </RadixSlider.Track>
      <RadixSlider.Thumb className={styles.SliderThumb} style={thumbStyle} />
    </RadixSlider.Root>
  );
};

export default LightnessSlider;
