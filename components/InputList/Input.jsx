import clsx from 'clsx';
import { forwardRef } from 'react';
import styles from './IpInput.module.css';

const InputList = forwardRef(function IpInput(
  {
    label,
    placeholder,
    className,
    size,
    ariaLabel,
    onRemove,
    required,
  },
  ref
) {
  return (
    <div className={clsx(styles.root, className)}>
      <label>
        {label && <div className={styles.label}>{label}</div>}
        <input
          type="text"
          placeholder={placeholder}
          ref={ref}
          className={clsx(styles.input, size && styles[size])}
          aria-label={ariaLabel}
          required={required}
        />
        {onRemove && (
          <button
            className={styles.removeButton}
            onClick={onRemove}
            aria-label="Remove"
          >
            Remove
          </button>
        )}
      </label>
    </div>
  );
});

export default InputList;
