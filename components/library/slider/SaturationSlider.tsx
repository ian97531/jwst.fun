import clsx from 'clsx';
import React, { useMemo } from 'react';

import * as RadixSlider from '@radix-ui/react-slider';

import styles from './Slider.module.css';

export type Props = Omit<RadixSlider.SliderProps, "value" | "onValueChange"> & {
  className?: string;
  hueDegrees: number;
  saturationPercent: number;
  lightnessPercent: number;
  onSaturationChange: (value: number) => void;
};

const SaturationSlider = (props: Props) => {
  const {
    className,
    hueDegrees,
    saturationPercent,
    lightnessPercent,
    onSaturationChange,
    min = 0,
    max = 100,
    step = 1,
    ...sliderProps
  } = props;

  const valueProps = useMemo(
    () => ({
      value: [saturationPercent],
      onValueChange: (value: number[]) => onSaturationChange(value[0]),
    }),
    [saturationPercent, onSaturationChange]
  );

  const trackStyle = useMemo(
    () => ({
      backgroundColor: "white",
      background: `linear-gradient(to right, 
          hsl(${hueDegrees}, 0%, ${lightnessPercent}%) 0%, 
          hsl(${hueDegrees}, 100%, ${lightnessPercent}%) 100%)`,
    }),
    [hueDegrees, lightnessPercent]
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

export default SaturationSlider;
