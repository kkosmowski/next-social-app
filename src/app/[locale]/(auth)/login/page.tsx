import type { ServerComponentProps } from '@/types/common';
import getIntl from '@/app/utils/getIntl';

import LoginForm from './LoginForm';
import styles from './page.module.css';

async function LoginPage({ params: { localeCode } }: ServerComponentProps) {
  const { t } = await getIntl(localeCode);

  return (
    <section className={styles.login}>
      <h2 className={styles.title}>{t('LOGIN.TITLE')}</h2>

      <LoginForm />

      <span>Create account</span>
      <span>Recover password</span>
    </section>
  );
}

export default LoginPage;
