'use client';

import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import useIntl from '@/app/hooks/useIntl';
import PasswordInput from '@/components/PasswordInput';
import EmailInput from '@/components/EmailInput';
import getFormData from '@/utils/getFormData';
import type { LoginPayload } from '@/types/auth';
import type { TranslationKey } from '@/types/i18n';
import { useAuth } from '@/contexts/AuthProvider';
import dynamicRoute from '@/app/utils/dynamicRoute';
import { Routes } from '@/consts/navigation';
import type { FormErrors } from '@/types/common';

import styles from './LoginForm.module.css';

const getInitialErrors = (globalError: TranslationKey | undefined): FormErrors<LoginPayload> => ({
  email: undefined,
  password: undefined,
  global: globalError,
});

function LoginForm() {
  const { t } = useIntl();
  const router = useRouter();
  const { login, loginApiError, isLoggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors<LoginPayload>>(getInitialErrors(loginApiError));

  useEffect(() => {
    if (isLoggedIn) {
      router.push(dynamicRoute(Routes.home));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    setErrors((errors) => ({
      ...errors,
      global: loginApiError,
    }));
  }, [loginApiError]);

  const handleSubmit = async (event: FormEvent) => {
    setIsLoading(true);
    event.preventDefault();

    const formData = getFormData<LoginPayload>(event.target);

    if (formData?.errors) {
      setErrors(formData.errors);
      setIsLoading(false);
      return;
    }

    if (!formData?.data) {
      setErrors((errors) => ({
        ...errors,
        global: 'AUTH.ERROR.INVALID_CREDENTIALS',
      }));
      setIsLoading(false);
      return;
    }

    await login(formData.data);
    setIsLoading(false);
  };

  const handleChange = (name: 'email' | 'password') => (value: string) => {
    setErrors((errors) => ({ ...errors, [name]: undefined }));

    if (name === 'email') {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <EmailInput value={email} error={errors?.email} onChange={handleChange('email')} />

      <PasswordInput value={password} error={errors?.password} onChange={handleChange('password')} />

      <span className={styles.errorText}>{errors.global}</span>

      <button className={`${styles.button} primary filled large`} type="submit" disabled={isLoading}>
        {isLoading ? t('COMMON.LOADING') : isLoggedIn ? t('COMMON.DONE') : t('LOGIN.SUBMIT')}
      </button>
    </form>
  );
}

export default LoginForm;
