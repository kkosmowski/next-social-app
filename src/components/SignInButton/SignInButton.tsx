'use client';

import useIntl from '@/app/hooks/useIntl';

import styles from './SignInButton.module.css';

function SignInButton() {
  const { t } = useIntl();

  const logIn = () => {};

  return (
    <button className={`${styles.button} primary filled`} onClick={logIn}>
      {t('NAV.LOGIN')}
    </button>
  );
}

export default SignInButton;
