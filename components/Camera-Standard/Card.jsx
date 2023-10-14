import { Container } from '@/components/Layout';
import clsx from 'clsx';
import Link from 'next/link';
import styles from './Post.module.css';

const CameraCardStandard = ({ floor, className }) => {
  return (
    <div className={clsx(styles.root, className)}>
        <Container >
            {/* <div className={styles.flexbox}> */}
              {floor.cameraIPs?.map((camera, index) => (
                  <div className={styles.card} key={index}>
                      <div className={styles.header}>
                          <h2>Camera {camera.name}</h2>
                      </div>
                      <div className={styles.content}>
                        <iframe 
                          src={camera.ip}
                          className={styles.reframe}
                          allowFullScreen>
                        </iframe>
                      </div>
                  </div>
              ))}
            {/* </div> */}
        </Container>
    </div>
  );
};

export default CameraCardStandard;
