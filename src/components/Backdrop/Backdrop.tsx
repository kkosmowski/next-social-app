import type { ReactNode } from 'react';

import styles from './Backdrop.module.css';

type Props = {
  background?: boolean;
  children?: ReactNode;
  onClick?: VoidFunction;
};

function prepareClassName(background: boolean, children: boolean): string {
  let className = styles.backdrop;

  if (children) {
    className += ` ${styles.withChildren}`;
  }
  if (background) {
    className += ` ${styles.withBackground}`;
  }

  return className;
}

function Backdrop({ background, children, onClick }: Props) {
  const className = prepareClassName(!!background, !!children);

  if (children) {
    return (
      <div className={className} onClick={() => onClick?.()}>
        {children}
      </div>
    );
  }
  return <div className={className} onClick={() => onClick?.()} />;
}

export default Backdrop;
