import clsx from 'clsx';
import { forwardRef } from 'react';
import styles from './Select.module.css';

export const Select = forwardRef(function Select(
  {
    type,
    options,
    className,
    loading,
    disabled,
    onChange,
    value,
  },
  ref
) {
  return (
    <select
      className={clsx(
        styles.select,
        className
      )}
      ref={ref}
      disabled={loading || disabled}
      onChange={onChange}
      value={value}
    >
      <option value="">Select an option</option>
      {options.map((option) => (
        <option value={option._id}>{option.name}</option>
      ))}
    </select>
  );
});