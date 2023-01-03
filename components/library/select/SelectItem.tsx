import clsx from 'clsx';
import React from 'react';

import { CheckIcon } from '@radix-ui/react-icons';
import * as RadixSelect from '@radix-ui/react-select';

import styles from './SelectItem.module.css';

export type Props = {
  className?: string;
  id: string;
  children: string;
};

const SelectItem = (props: Props) => {
  const { children, className, id } = props;

  return (
    <RadixSelect.Item className={styles.SelectItem} value={id}>
      <RadixSelect.ItemIndicator className={styles.SelectItemIndicator}>
        <CheckIcon />
      </RadixSelect.ItemIndicator>
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
    </RadixSelect.Item>
  );
};

export default SelectItem;
