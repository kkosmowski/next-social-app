'use client';

import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';

import useIntl from '@/app/hooks/useIntl';
import PasswordInput from '@/components/PasswordInput';
import EmailInput from '@/components/EmailInput';
import getFormData from '@/utils/getFormData';
import type { LoginPayload } from '@/types/auth';
import type { TranslationKey } from '@/types/i18n';
import { useAuth } from '@/contexts/AuthProvider';

import styles from './LoginForm.module.css';

function LoginForm() {
  const { t } = useIntl();
  const { login, loginApiError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(loginApiError);
  const [fieldErrors, setFieldErrors] = useState<Record<string, TranslationKey | undefined> | null>(null);

  useEffect(() => {
    setError(loginApiError);
  }, [loginApiError]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = getFormData<LoginPayload>(event.target);

    if (formData?.errors) {
      setFieldErrors(formData.errors);
      return;
    }

    if (!formData?.data) {
      setError('Could not log in. Make sure credentials are provided.');
      return;
    }

    login(formData.data);
  };

  const handleChange = (name: 'email' | 'password') => (value: string) => {
    setFieldErrors((errors) => ({ ...errors, [name]: undefined }));

    if (name === 'email') {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <EmailInput value={email} error={fieldErrors?.email} onChange={handleChange('email')} />

      <PasswordInput value={password} error={fieldErrors?.password} onChange={handleChange('password')} />

      <span className={styles.errorText}>{error}</span>

      <button className={`${styles.button} primary filled large`} type="submit">
        {t('LOGIN.SUBMIT')}
      </button>
    </form>
  );
}

export default LoginForm;
