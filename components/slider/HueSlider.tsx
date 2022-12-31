import clsx from 'clsx';
import React, { useMemo } from 'react';

import * as RadixSlider from '@radix-ui/react-slider';

import styles from './Slider.module.css';

export type Props = Omit<RadixSlider.SliderProps, "value" | "onValueChange"> & {
  className?: string;
  hue: number;
  saturation: number;
  lightness: number;
  onHueChange: (value: number) => void;
};

const HueSlider = (props: Props) => {
  const {
    className,
    hue,
    saturation,
    lightness,
    onHueChange,
    min = 0,
    max = 360,
    step = 1,
    ...sliderProps
  } = props;

  const valueProps = useMemo(
    () => ({
      value: [hue],
      onValueChange: (value: number[]) => onHueChange(value[0]),
    }),
    [hue, onHueChange]
  );

  const trackStyle = useMemo(
    () => ({
      background: `linear-gradient(to right, 
          hsl(0, ${saturation}%, ${lightness}%) 0%, 
          hsl(36, ${saturation}%, ${lightness}%) 10%, 
          hsl(72, ${saturation}%, ${lightness}%) 20%, 
          hsl(108, ${saturation}%, ${lightness}%) 30%, 
          hsl(144, ${saturation}%, ${lightness}%) 40%, 
          hsl(180, ${saturation}%, ${lightness}%) 50%, 
          hsl(216, ${saturation}%, ${lightness}%) 60%, 
          hsl(252, ${saturation}%, ${lightness}%) 70%, 
          hsl(288, ${saturation}%, ${lightness}%) 80%, 
          hsl(324, ${saturation}%, ${lightness}%) 90%, 
          hsl(360, ${saturation}%, ${lightness}%) 100%)`,
    }),
    [saturation, lightness]
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

export default HueSlider;
