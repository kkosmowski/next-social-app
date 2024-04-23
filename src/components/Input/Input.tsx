import type { ChangeEventHandler, InputHTMLAttributes } from 'react';

import useIntl from '@/app/hooks/useIntl';
import type { TranslationKey } from '@/types/i18n';

import styles from './Input.module.css';

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'name' | 'value' | 'onChange'> & {
  label: string;
  name: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  error?: TranslationKey;
};

function Input(props: InputProps) {
  const { label, name, value, onChange, error, className, ...inputProps } = props;
  const { t } = useIntl();
  const _className = error ? `${className} error` : className;

  return (
    <label className={styles.label}>
      <span>
        {label}
        {props.required && <span className={styles.required}>*</span>}
      </span>
      <input name={name} value={value} onChange={onChange} className={_className} {...inputProps} />
      <span className={styles.errorText}>{error && t(error)}</span>
    </label>
  );
}

export default Input;
