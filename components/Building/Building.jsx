import { Avatar } from '@/components/Avatar';
import { Container } from '@/components/Layout';
import { format } from '@lukeed/ms';
import clsx from 'clsx';
import Link from 'next/link';
import { useMemo } from 'react';
import styles from './Post.module.css';

const Building = ({ building, className }) => {
  return (
    <div className={clsx(styles.root, className)}>
        <Container className={styles.creator}>
          <Container column className={styles.meta}>
            <p className={styles.name}>{building.name}</p>
          </Container>
        </Container>

      {/* <div className={styles.wrap}>
        <p className={styles.content}>{post.content}</p>
      </div>
      <div className={styles.wrap}>
        <time dateTime={String(post.createdAt)} className={styles.timestamp}>
          {timestampTxt}
        </time>
      </div> */}
    </div>
  );
};

export default Building;
