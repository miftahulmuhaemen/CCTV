import { ButtonLink } from '@/components/Button';
import { Container, Spacer, Wrapper } from '@/components/Layout';
import Link from 'next/link';
import styles from './Hero.module.css';
import { LoadingDots } from '@/components/LoadingDots';
import { useCurrentUser } from '@/lib/user';
import { Text, TextLink } from '@/components/Text';
import { useCallback, useRef, useState } from 'react';

const Hero = () => {

  const { data, error } = useCurrentUser();
  const loading = !data && !error;
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Wrapper>
      <div>
        
        <h1 className={styles.title}>
          <span className={styles.nextjs}>Dashboard</span>
          <span className={styles.mongodb}>Monitoring</span>
          <span>UHAMKA</span>
        </h1>
        {loading ? (
          <LoadingDots>Loading</LoadingDots>
        ) : data?.user ? (
          <Container justifyContent="center" className={styles.buttons}>
            <Container>
              <ButtonLink
            // href={`/user/${post.creator.username}/post/${post._id}`}
                href={`/user/${data.user.username}/floors`}
                type="secondary"
                className={styles.button}
              >
                Open Cameras
              </ButtonLink>
            </Container>
          </Container>
        ) : null}
        
        {/* <p className={styles.subtitle}>
          Description.
        </p> */}
      </div>
    </Wrapper>
  );
};

export default Hero;
