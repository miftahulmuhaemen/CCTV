import { Container } from '@/components/Layout';
import clsx from 'clsx';
import { fetcher } from '@/lib/fetch';
import { useCallback, useState } from 'react';
import styles from './Post.module.css';
import toast from 'react-hot-toast';

const User = ({ user, className, mutate }) => {
  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await fetcher(`/api/users`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            id: user._id,
          }),
        });
        toast.success('You have delete the user successfully');
        mutate();
      } catch (e) {
        toast.error(e.message);
      } 
    },
    [user]
  );
  return (
    <div className={clsx(styles.root, className)}>
        <Container className={styles.creator}>
          <Container column className={styles.meta}>
            <p className={styles.name}>Nama&ensp;:&ensp;{user.name}</p>
            <p className={styles.name}>Email&ensp;:&ensp;{user.email}</p>
            {user?.role?.name ? <p className={styles.name}>Role&ensp;:&ensp;{user.role.name}</p> : null}
          </Container>
        </Container>
        <button
          onClick={onSubmit}
          className={styles.btn}
        >
          Hapus
        </button>
    </div>
  );
};

export default User;
