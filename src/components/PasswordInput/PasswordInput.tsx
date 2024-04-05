'use client';

import useIntl from '@/app/hooks/useIntl';
import Input from '@/components/Input';
import type { InputProps } from '@/components/Input/Input';

type Props = Omit<InputProps, 'name' | 'label' | 'onChange'> & {
  onChange: (value: string) => void;
};

function PasswordInput(props: Props) {
  const { value, onChange, ...inputProps } = props;
  const { t } = useIntl();

  return (
    <Input
      type="password"
      name="password"
      label={t('AUTH.PASSWORD.LABEL')}
      placeholder={t('AUTH.PASSWORD.PLACEHOLDER')}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...inputProps}
    />
  );
}

export default PasswordInput;
