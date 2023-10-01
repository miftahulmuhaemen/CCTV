import { Container } from '@/components/Layout';
import clsx from 'clsx';
import styles from './Post.module.css';

const Floor = ({ floor, className }) => {
  console.log(floor)
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
    </div>
  );
};

export default Floor;
