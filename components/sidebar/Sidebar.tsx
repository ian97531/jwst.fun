import clsx from 'clsx';
import React from 'react';

import { Inconsolata } from '@next/font/google';

import styles from './Sidebar.module.css';

const inconsolata = Inconsolata({ subsets: ["latin"] });

export type Props = {
  className?: string;
  children: React.ReactNode;
};

const Sidebar = (props: Props) => {
  const { children, className } = props;

  return (
    <aside className={clsx(styles.Sidebar, inconsolata.className, className)}>
      {children}
    </aside>
  );
};

export default Sidebar;
