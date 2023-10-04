import { Container } from '@/components/Layout';
import clsx from 'clsx';
import styles from './Post.module.css';

const User = ({ user, className }) => {
  return (
    <div className={clsx(styles.root, className)}>
        <Container className={styles.creator}>
          <Container column className={styles.meta}>
            <p className={styles.name}>{user.name}</p>
            <p className={styles.name}>{user.email}</p>
            {user?.role?.name ? <p className={styles.name}>{user.role.name}</p> : null}
          </Container>
        </Container>
    </div>
  );
};

export default User;
