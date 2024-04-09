import { redirect } from 'next/navigation';

import type { PageProps } from '@/types/common';
import getIntl from '@/app/utils/getIntl';
import LoginForm from '@/app/[localeCode]/(auth)/login/LoginForm';
import { Routes } from '@/consts/navigation';
import dynamicRoute from '@/app/utils/dynamicRoute';
import session from '@/app/api/[utils]/SessionClient';

import styles from './page.module.css';

async function LoginPage({ params: { localeCode } }: PageProps) {
  const { isLoggedIn } = await session.getData();

  if (isLoggedIn) {
    redirect(dynamicRoute(Routes.home, { localeCode }));
  }

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
