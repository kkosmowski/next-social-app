import type { ChangeEventHandler, TextareaHTMLAttributes } from 'react';

import useIntl from '@/app/hooks/useIntl';
import type { TranslationKey } from '@/types/i18n';

import styles from './TextArea.module.css';

export type TextAreaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'name' | 'value' | 'onChange'> & {
  label: string;
  name: string;
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  error?: TranslationKey;
};

function TextArea(props: TextAreaProps) {
  const { label, name, value, onChange, error, className, ...inputProps } = props;
  const { t } = useIntl();
  const _className = error ? `${className} error` : className;

  return (
    <label className={styles.label}>
      <span>
        {label}
        {props.required && <span className={styles.required}>*</span>}
      </span>
      <textarea name={name} value={value} onChange={onChange} className={_className} {...inputProps} />
      <span className={styles.errorText}>{error && t(error)}</span>
    </label>
  );
}

export default TextArea;
