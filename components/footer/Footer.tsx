import clsx from 'clsx';
import React from 'react';

import { Inconsolata } from '@next/font/google';

import styles from './Footer.module.css';

const inconsolata = Inconsolata({ subsets: ["latin"] });

export type Props = {
  className?: string;
  imageWidth: number;
  imageHeight: number;
  scale: number;
};

const Footer = (props: Props) => {
  const { className, imageWidth, imageHeight, scale } = props;

  const zoom = scale * 100;
  return (
    <footer className={clsx(styles.Footer, inconsolata.className, className)}>
      <span>
        {imageWidth}px &#215; {imageHeight}px
      </span>
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
