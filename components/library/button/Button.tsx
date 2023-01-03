import clsx from 'clsx';
import React from 'react';

import styles from './Button.module.css';

export type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: (evt: React.MouseEvent) => void;
  variant?: "normal" | "small";
};

const Button = (props: Props) => {
  const {
    children,
    className,

    onClick,
    variant = "normal",
  } = props;

  return (
    <button
      className={clsx(styles.Button, styles[variant], className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
