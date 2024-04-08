'use client';

import useIntl from '@/app/hooks/useIntl';
import Input from '@/components/Input';
import type { InputProps } from '@/components/Input/Input';
import type { TranslationKey } from '@/types/i18n';

type Props = Omit<InputProps, 'name' | 'label' | 'onChange'> & {
  error?: TranslationKey;
  onChange: (value: string) => void;
};

function EmailInput(props: Props) {
  const { value, onChange, error, ...inputProps } = props;
  const { t } = useIntl();

  return (
    <Input
      type="email"
      name="email"
      label={t('AUTH.EMAIL.LABEL')}
      placeholder={t('AUTH.EMAIL.PLACEHOLDER')}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      error={error}
      {...inputProps}
    />
  );
}

export default EmailInput;
