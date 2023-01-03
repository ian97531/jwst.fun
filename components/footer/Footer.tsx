import clsx from 'clsx';
import React from 'react';

import styles from './Footer.module.css';

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
    <footer className={clsx(styles.Footer, className)}>
      <span>
        {imageWidth}px &#215; {imageHeight}px
      </span>
      <span>Zoom: {zoom.toFixed(1)}%</span>
      <span className={styles.credits}>
        Created for Matthew Vernacchia and Commonwealth Fusion Systems by{" "}
        <a href="https://github.com/ian97531" target="_blank">
          Ian White
        </a>
      </span>
    </footer>
  );
};

export default Footer;
