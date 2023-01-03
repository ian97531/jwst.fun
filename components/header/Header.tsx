import clsx from 'clsx';
import ButtonSwitch from 'components/library/button-switch/ButtonSwitch';
import Select from 'components/library/select/Select';
import SelectItem from 'components/library/select/SelectItem';
import { Observation } from 'data/observations.types';
import React, { useCallback } from 'react';

import { Inconsolata } from '@next/font/google';
import { animated, config, to, useSpring } from '@react-spring/web';

import styles from './Header.module.css';

const inconsolata = Inconsolata({ subsets: ["latin"] });

export type Props = {
  className?: string;
  filterAdjustmentOpen: boolean;
  observationOptions: Record<string, string>;
  onSelectObservation: (name: string) => void;
  onToggleFilterAdjustments?: (newValue: boolean) => void;
  selectedObservation: string;
};

const Header = (props: Props) => {
  const {
    className,
    filterAdjustmentOpen,
    observationOptions,
    onSelectObservation,
    onToggleFilterAdjustments,
    selectedObservation,
  } = props;

  const [{ angle }, angleApi] = useSpring(() => ({
    angle: 0,
    config: config.wobbly,
  }));

  const spin = useCallback(() => {
    angleApi.set({ angle: 0 });
    angleApi.start({ angle: Math.PI });
  }, [angleApi]);

  return (
    <header className={clsx(styles.Header, inconsolata.className, className)}>
      <div className={styles.logo} onPointerEnter={spin}>
        <animated.img
          srcSet="/logo-small/jwst-logo.png, /logo-small/jwst-logo@2x.png 2x, /logo-small/jwst-logo@3x.png 3x"
          src="/logo-small/jwst-logo@3x.png"
          alt="logo"
          width={40}
          height={40}
          style={{
            transform: to([angle], (a: number) => `rotate(${a}rad)`),
          }}
        />
      </div>
      <div className={styles.title}>JWST.fun 🔭</div>
      <div className={styles.observation}>
        <Select
          menuClassName={styles.menu}
          defaultValue={selectedObservation}
          onValueChange={onSelectObservation}
        >
          {Object.entries(observationOptions).map(([id, name]) => (
            <SelectItem key={id} id={id}>
              {name}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className={styles.controls}>
        <ButtonSwitch
          on={filterAdjustmentOpen}
          onToggle={onToggleFilterAdjustments}
        >
          Filter Adjustments
        </ButtonSwitch>
      </div>
    </header>
  );
};

export default Header;
