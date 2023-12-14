import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Container, Wrapper } from '@/components/Layout';
import { LoadingDots } from '@/components/LoadingDots';
import { Text, TextLink } from '@/components/Text';
import { Select } from '@/components/Select';
import { fetcher } from '@/lib/fetch';
import { usePostPages } from '@/lib/post';
import { useCurrentUser } from '@/lib/user';
import Link from 'next/link';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import styles from './UserRegister.module.css';

const PosterInner = () => {

  const router = useRouter();
  const onSubmit = useCallback(
    async (e) => {
      router.push('/register');
    },
    []
  );

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Container className={styles.creator}>
        <div className={styles.buttonContainer}>
          <Button type="success" onClick={onSubmit}>
            Tambahkan User
          </Button>
        </div>
      </Container>
    </form>
  );
};

const Poster = ({building}) => {
  const { data, error } = useCurrentUser();
  const loading = !data && !error;

  return (
    <Wrapper>
      <div className={styles.root}>
        {loading ? (
          <LoadingDots>Loading</LoadingDots>
        ) : data?.user ? (
          <PosterInner user={data.user} building={building} />
        ) : (
          <Text color="secondary">
            Please{' '}
            <Link href="/login" passHref legacyBehavior>
              <TextLink color="link" variant="highlight">
                Sign In
              </TextLink>
            </Link>{' '}
          </Text>
        )}
      </div>
    </Wrapper>
  );
};

export default Poster;
