import clsx from 'clsx';
import Button from 'components/library/button/Button';
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
    <Button
      className={clsx(styles.ButtonSwitch, on && styles.active, className)}
      onClick={() => onToggle?.(!on)}
      variant={variant}
    >
      {children}
    </Button>
  );
};

export default ButtonSwitch;
