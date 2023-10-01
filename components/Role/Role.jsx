import { Container } from '@/components/Layout';
import clsx from 'clsx';
import { fetcher } from '@/lib/fetch';
import { useCallback, useState } from 'react';
import styles from './Post.module.css';
import toast from 'react-hot-toast';

const Role = ({ role, className, mutate }) => {
  
  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        console.log(role._id)
        await fetcher(`/api/roles/floors`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            id: role._id,
          }),
        });
        toast.success('You have delete the Role successfully');
        mutate();
      } catch (e) {
        toast.error(e.message);
      } 
    },
    [role]
  );
  return (
    <div className={clsx(styles.root, className)}>
        <Container className={styles.creator}>
          <Container column className={styles.meta}>
            <p className={styles.name}>{role.name}</p>
            <ul className={styles.wordList}>
              {role.floors.map((floor) => (
                <li>{floor.name}</li>
              ))}
            </ul>
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

export default Role;
