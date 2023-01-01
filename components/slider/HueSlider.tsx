import clsx from 'clsx';
import React, { useMemo } from 'react';

import * as RadixSlider from '@radix-ui/react-slider';

import styles from './Slider.module.css';

export type Props = Omit<RadixSlider.SliderProps, "value" | "onValueChange"> & {
  className?: string;
  hueDegrees: number;
  saturationPercent: number;
  lightnessPercent: number;
  onHueChange: (hueDegrees: number) => void;
};

const HueSlider = (props: Props) => {
  const {
    className,
    hueDegrees,
    saturationPercent,
    lightnessPercent,
    onHueChange,
    min = 0,
    max = 360,
    step = 1,
    ...sliderProps
  } = props;

  const valueProps = useMemo(
    () => ({
      value: [hueDegrees],
      onValueChange: (value: number[]) => onHueChange(value[0]),
    }),
    [hueDegrees, onHueChange]
  );

  const trackStyle = useMemo(
    () => ({
      background: `linear-gradient(to right, 
          hsl(0, ${saturationPercent}%, ${lightnessPercent}%) 0%, 
          hsl(36, ${saturationPercent}%, ${lightnessPercent}%) 10%, 
          hsl(72, ${saturationPercent}%, ${lightnessPercent}%) 20%, 
          hsl(108, ${saturationPercent}%, ${lightnessPercent}%) 30%, 
          hsl(144, ${saturationPercent}%, ${lightnessPercent}%) 40%, 
          hsl(180, ${saturationPercent}%, ${lightnessPercent}%) 50%, 
          hsl(216, ${saturationPercent}%, ${lightnessPercent}%) 60%, 
          hsl(252, ${saturationPercent}%, ${lightnessPercent}%) 70%, 
          hsl(288, ${saturationPercent}%, ${lightnessPercent}%) 80%, 
          hsl(324, ${saturationPercent}%, ${lightnessPercent}%) 90%, 
          hsl(360, ${saturationPercent}%, ${lightnessPercent}%) 100%)`,
    }),
    [saturationPercent, lightnessPercent]
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

export default HueSlider;
