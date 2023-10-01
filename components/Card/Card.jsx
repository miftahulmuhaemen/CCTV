import { Container } from '@/components/Layout';
import clsx from 'clsx';
import Link from 'next/link';
import styles from './Post.module.css';

const Card = ({ floors, className }) => {
  return (
    <div className={clsx(styles.root, className)}>
        <Container >
            <div className={styles.flexbox}>
              {floors?.map((item) => (
                <Link
                  key={item.floor._id}
                  href={`/user/${item.user.username}/floors/detail/${item.floor._id}`}
                  passHref
                  legacyBehavior>
                  <div className={styles.card}>
                      <div className={styles.header}>
                          <h2>Lantai {item.floor.name}</h2>
                      </div>
                      <div className={styles.content}>
                          <ul>
                          {item.cameraIPs.map((camera) => (<li>{camera.name} - {camera.ip}</li>))}
                          </ul>
                      </div>
                  </div>
                </Link>
              ))}
            </div>
        </Container>
    </div>
  );
};

export default Card;
