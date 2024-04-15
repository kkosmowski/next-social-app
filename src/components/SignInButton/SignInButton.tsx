'use client';

import { useRouter } from 'next/navigation';

import useIntl from '@/app/hooks/useIntl';
import { Routes } from '@/consts/navigation';
import dynamicRoute from '@/app/utils/dynamicRoute';

import styles from './SignInButton.module.css';

function SignInButton() {
  const { t } = useIntl();
  const router = useRouter();

  const logIn = () => {
    router.push(dynamicRoute(Routes.login));
  };

  return (
    <button className={`${styles.button} primary filled`} onClick={logIn}>
      {t('NAV.LOGIN')}
    </button>
  );
}

export default SignInButton;
