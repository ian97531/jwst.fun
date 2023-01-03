import clsx from 'clsx';
import React from 'react';

import styles from './Sidebar.module.css';

export type Props = {
  className?: string;
  children: React.ReactNode;
};

const Sidebar = (props: Props) => {
  const { children, className } = props;

  return <aside className={clsx(styles.Sidebar, className)}>{children}</aside>;
};

export default Sidebar;
