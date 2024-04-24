import type { ChangeEventHandler, InputHTMLAttributes } from 'react';

import useIntl from '@/app/hooks/useIntl';
import type { TranslationKey } from '@/types/i18n';

import styles from './Input.module.css';

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'name' | 'value' | 'onChange'> & {
  label: string;
  labelHidden?: boolean;
  name: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  error?: TranslationKey;
  ghost?: boolean;
};

function buildClassName({ error, ghost, className }: Pick<InputProps, 'error' | 'ghost' | 'className'>) {
  let result = className;

  if (error) result += ' error';
  if (ghost) result += ' ghost';

  return result;
}

function Input(props: InputProps) {
  const { label, labelHidden, name, value, onChange, error, ghost, className, ...inputProps } = props;
  const { t } = useIntl();
  const _className = buildClassName({ error, ghost, className });

  return (
    <label className={styles.label}>
      {!labelHidden && (
        <span>
          {label}
          {props.required && <span className={styles.required}>*</span>}
        </span>
      )}
      <input name={name} value={value} onChange={onChange} aria-label={label} className={_className} {...inputProps} />
      <span className={styles.errorText}>{error && t(error)}</span>
    </label>
  );
}

export default Input;
