import clsx from 'clsx';
import React, { useMemo } from 'react';

import * as RadixSlider from '@radix-ui/react-slider';

import styles from './Slider.module.css';

export type Props = Omit<RadixSlider.SliderProps, "value" | "onValueChange"> & {
  className?: string;
  hue: number;
  saturation: number;
  lightness: number;
  onSaturationChange: (value: number) => void;
};

const SaturationSlider = (props: Props) => {
  const {
    className,
    hue,
    saturation,
    lightness,
    onSaturationChange,
    min = 0,
    max = 100,
    step = 1,
    ...sliderProps
  } = props;

  const valueProps = useMemo(
    () => ({
      value: [saturation],
      onValueChange: (value: number[]) => onSaturationChange(value[0]),
    }),
    [saturation, onSaturationChange]
  );

  const trackStyle = useMemo(
    () => ({
      backgroundColor: "white",
      background: `linear-gradient(to right, 
          hsl(${hue}, 0%, ${lightness}%) 0%, 
          hsl(${hue}, 100%, ${lightness}%) 100%)`,
    }),
    [hue, lightness]
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

export default SaturationSlider;
