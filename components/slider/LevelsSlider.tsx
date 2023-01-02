import clsx from 'clsx';
import React, { useMemo } from 'react';

import * as RadixSlider from '@radix-ui/react-slider';

import levelSliderStyles from './LevelsSlider.module.css';
import sliderStyles from './Slider.module.css';

export type Props = Omit<RadixSlider.SliderProps, "value" | "onValueChange"> & {
  className?: string;
  blackValue: number;
  whiteValue: number;
  onWhiteValueChange?: (value: number) => void;
  onBlackValueChange?: (value: number) => void;
};

const LevelsSlider = (props: Props) => {
  const {
    className,
    blackValue,
    whiteValue,
    onBlackValueChange,
    onWhiteValueChange,
    minStepsBetweenThumbs = 1,
    min = 0,
    max = 100,
    step = 1,
    ...sliderProps
  } = props;

  const valueProps = useMemo(
    () => ({
      value: [blackValue, whiteValue],
      onValueChange: ([newBlackValue, newWhiteValue]: number[]) => {
        if (newBlackValue !== blackValue) {
          onBlackValueChange?.(newBlackValue);
        }

        if (newWhiteValue !== whiteValue) {
          onWhiteValueChange?.(newWhiteValue);
        }
      },
    }),
    [blackValue, onBlackValueChange, whiteValue]
  );

  return (
    <RadixSlider.Root
      className={clsx(sliderStyles.SliderRoot, className)}
      min={min}
      max={max}
      step={step}
      {...sliderProps}
      {...valueProps}
    >
      <RadixSlider.Track
        className={clsx(sliderStyles.SliderTrack, levelSliderStyles.track)}
      >
        <RadixSlider.Range className={sliderStyles.SliderRange} />
      </RadixSlider.Track>
      <RadixSlider.Thumb
        className={sliderStyles.SliderThumb}
        style={{ backgroundColor: "black" }}
      />
      <RadixSlider.Thumb
        className={sliderStyles.SliderThumb}
        style={{ backgroundColor: "white" }}
      />
    </RadixSlider.Root>
  );
};

export default LevelsSlider;
