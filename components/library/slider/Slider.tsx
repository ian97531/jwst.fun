import clsx from 'clsx';
import React from 'react';

import * as RadixSlider from '@radix-ui/react-slider';

import styles from './Slider.module.css';

export type Props = RadixSlider.SliderProps & {
  className?: string;
};

const Slider = (props: Props) => {
  const { className, ...sliderProps } = props;

  return (
    <RadixSlider.Root
      className={clsx(styles.SliderRoot, className)}
      {...sliderProps}
    >
      <RadixSlider.Track className={styles.SliderTrack}>
        <RadixSlider.Range className={styles.SliderRange} />
      </RadixSlider.Track>
      <RadixSlider.Thumb className={styles.SliderThumb} />
    </RadixSlider.Root>
  );
};

export default Slider;
