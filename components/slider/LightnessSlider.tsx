import clsx from 'clsx';
import React, { useMemo } from 'react';

import * as RadixSlider from '@radix-ui/react-slider';

import styles from './Slider.module.css';

export type Props = Omit<RadixSlider.SliderProps, "value" | "onValueChange"> & {
  className?: string;
  hue: number;
  saturation: number;
  lightness: number;
  onLightnessChange: (value: number) => void;
};

const LightnessSlider = (props: Props) => {
  const {
    className,
    hue,
    saturation,
    lightness,
    onLightnessChange,
    min = 0,
    max = 100,
    step = 1,
    ...sliderProps
  } = props;

  const valueProps = useMemo(
    () => ({
      value: [lightness],
      onValueChange: (value: number[]) => onLightnessChange(value[0]),
    }),
    [lightness, onLightnessChange]
  );

  const trackStyle = useMemo(
    () => ({
      background: `linear-gradient(to right, 
          hsl(${hue}, ${saturation}%, 0%) 0%, 
          hsl(${hue}, ${saturation}%, 50%) 50%, 
          hsl(${hue}, ${saturation}%, 100%) 100%)`,
    }),
    [hue, saturation]
  );

  const thumbStyle = useMemo(
    () => ({
      backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
    }),
    [hue, saturation, lightness]
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
