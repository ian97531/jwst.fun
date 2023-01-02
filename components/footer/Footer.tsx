import clsx from 'clsx';
import React from 'react';

import { Inconsolata } from '@next/font/google';

import styles from './Footer.module.css';

const inconsolata = Inconsolata({ subsets: ["latin"] });

export type Props = {
  className?: string;
  scale: number;
};

const Footer = (props: Props) => {
  const { className, scale } = props;

  const zoom = scale * 100;
  return (
    <footer className={clsx(styles.Footer, inconsolata.className, className)}>
      <span>Zoom: {zoom.toFixed(1)}%</span>
      <span className={styles.credits}>
        Images from the{" "}
        <a href="https://archive.stsci.edu/">
          Space Telescope Science Institute
        </a>
        ; Created by Ian White
      </span>
    </footer>
  );
};

export default Footer;
