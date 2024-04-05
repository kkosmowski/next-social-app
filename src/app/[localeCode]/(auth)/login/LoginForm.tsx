'use client';

import { useState } from 'react';

import useIntl from '@/app/hooks/useIntl';
import PasswordInput from '@/components/PasswordInput';
import EmailInput from '@/components/EmailInput';

import styles from './LoginForm.module.css';

function LoginForm() {
  const { t } = useIntl();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form className={styles.form}>
      <EmailInput value={email} onChange={setEmail} />

      <PasswordInput value={password} onChange={setPassword} />

      <button className={`${styles.button} primary filled large`} type="submit">
        {t('LOGIN.SUBMIT')}
      </button>
    </form>
  );
}

export default LoginForm;
