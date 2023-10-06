import { Container } from '@/components/Layout';
import clsx from 'clsx';
import { fetcher } from '@/lib/fetch';
import { useCallback, useState } from 'react';
import styles from './Post.module.css';
import toast from 'react-hot-toast';

const Floor = ({ floor, className, mutate }) => {

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await fetcher(`/api/floors`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            id: floor._id,
          }),
        });
        toast.success('You have delete the Floor successfully');
        mutate();
      } catch (e) {
        toast.error(e.message);
      } 
    },
    [floor]
  );
  return (
    <div className={clsx(styles.root, className)}>
        <Container className={styles.creator}>
          <Container column className={styles.meta}>
            <p className={styles.name}>{floor.name}</p>
            <ul className={styles.wordList}>
              {floor.cameraIPs.map((camera) => (
                <li>{camera.name} - {camera.ip}</li>
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

export default Floor;
