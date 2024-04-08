'use client';

import useIntl from '@/app/hooks/useIntl';
import Input from '@/components/Input';
import type { InputProps } from '@/components/Input/Input';
import { MIN_PASSWORD_LENGTH } from '@/consts/auth';
import type { TranslationKey } from '@/types/i18n';

type Props = Omit<InputProps, 'name' | 'label' | 'onChange'> & {
  error?: TranslationKey;
  onChange: (value: string) => void;
};

function PasswordInput(props: Props) {
  const { value, onChange, error, ...inputProps } = props;
  const { t } = useIntl();

  return (
    <Input
      type="password"
      name="password"
      label={t('AUTH.PASSWORD.LABEL')}
      placeholder={t('AUTH.PASSWORD.PLACEHOLDER')}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      error={error}
      minLength={MIN_PASSWORD_LENGTH}
      {...inputProps}
    />
  );
}

export default PasswordInput;
