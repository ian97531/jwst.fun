import clsx from 'clsx';
import React from 'react';

import { Inconsolata } from '@next/font/google';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import * as RadixSelect from '@radix-ui/react-select';

import styles from './Select.module.css';

const inconsolata = Inconsolata({ subsets: ["latin"] });

export type Props = RadixSelect.SelectProps & {
  className?: string;
  menuClassName?: string;
  children?: React.ReactNode;
  placeholder?: string;
};

const Select = (props: Props) => {
  const {
    children,
    className,
    menuClassName,
    placeholder,
    ...remainingSelectProps
  } = props;

  return (
    <RadixSelect.Root {...remainingSelectProps}>
      <RadixSelect.Trigger className={clsx(styles.SelectTrigger, className)}>
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon className={styles.SelectIcon}>
          <ChevronDownIcon />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content
          className={clsx(
            styles.SelectContent,
            inconsolata.className,
            menuClassName
          )}
        >
          <RadixSelect.ScrollUpButton className={styles.SelectScrollButton} />
          <RadixSelect.Viewport className={styles.SelectViewport}>
            {children}
          </RadixSelect.Viewport>
          <RadixSelect.ScrollDownButton className={styles.SelectScrollButton} />
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
};

export default Select;
