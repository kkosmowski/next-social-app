import type { ChangeEventHandler, InputHTMLAttributes } from 'react';

import styles from './Input.module.css';

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'name' | 'value' | 'onChange'> & {
  label: string;
  name: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

function Input(props: InputProps) {
  const { label, name, value, onChange, ...inputProps } = props;

  return (
    <label className={styles.label}>
      {label}
      <input name={name} value={value} onChange={onChange} {...inputProps} />
    </label>
  );
}

export default Input;
