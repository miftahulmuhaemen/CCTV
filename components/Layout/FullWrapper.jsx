import clsx from 'clsx';
import styles from './FullWrapper.module.css';

const FullWrapper = ({ children, className }) => {
  return <div className={clsx(styles.wrapper, className)}>{children}</div>;
};

export default FullWrapper;
