import type { PropsWithChildren } from '@/types/common';

import styles from './layout.module.css';

function AuthLayout({ children }: PropsWithChildren) {
  return (
    <section className={styles.wrapper}>
      <section className={styles.container}>{children}</section>
    </section>
  );
}

export default AuthLayout;
