import clsx from 'clsx';
import React from 'react';

import styles from './ButtonSwitch.module.css';

export type Props = {
  children: React.ReactNode;
  className?: string;
  on?: boolean;
  onToggle?: (newOnValue: boolean) => void;
  variant?: "normal" | "small";
};

const ButtonSwitch = (props: Props) => {
  const {
    children,
    className,
    on = false,
    onToggle,
    variant = "normal",
  } = props;

  return (
    <button
      className={clsx(
        styles.ButtonSwitch,
        styles[variant],
        on && styles.active,
        className
      )}
      onClick={() => onToggle?.(!on)}
    >
      {children}
    </button>
  );
};

export default ButtonSwitch;
