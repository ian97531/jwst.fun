import clsx from 'clsx';
import { Observation } from 'data/observations.types';
import React, { useCallback } from 'react';

import { Inconsolata } from '@next/font/google';
import { animated, config, to, useSpring } from '@react-spring/web';

import styles from './Header.module.css';

const inconsolata = Inconsolata({ subsets: ["latin"] });

export type Props = {
  className?: string;
  observations: Record<string, Observation>;
  onSelectObservation: (name: string) => void;
  selectedObservation: string;
};

const Header = (props: Props) => {
  const { className, observations, selectedObservation } = props;

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
      <div className={styles.title}>
        JWST.fun 🔭 {observations[selectedObservation].name}
      </div>
    </header>
  );
};

export default Header;
