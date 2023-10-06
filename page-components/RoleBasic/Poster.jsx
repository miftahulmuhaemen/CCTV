import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Container, Wrapper } from '@/components/Layout';
import { LoadingDots } from '@/components/LoadingDots';
import { Text, TextLink } from '@/components/Text';
import { fetcher } from '@/lib/fetch';
import { usePostPages } from '@/lib/post';
import { useFloorPages } from '@/lib/floor';
import { Select } from '@/components/Select';
import { useCurrentUser } from '@/lib/user';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import styles from './Poster.module.css';

const PosterInner = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [roleName, setRoleName] = useState('');

  const handleRoleNameChange = (e) => {
    setRoleName(e.target.value);
  };
  
  const { mutate } = usePostPages();
  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        await fetcher(`/api/role`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            name: roleName,
          }),
        });
        toast.success('You have insert new Floor successfully');
        setRoleName('');
        mutate();
      } catch (e) {
        toast.error(e.message);
      } finally {
        setIsLoading(false);
      }
    },
    [roleName]
  );

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Container className={styles.creator}>
        <div className={styles.formSection}>
          <label className={styles.label}>Role Name:</label>
          <input
            type="text"
            className={styles.input}
            value={roleName}
            onChange={handleRoleNameChange}
          />
        </div>
        <div className={styles.buttonContainer}> 
          <Button type="success" loading={isLoading} onClick={onSubmit}>
            Tambahkan Role
          </Button>
        </div>
      </Container>
    </form>
  );
};

const Poster = () => {
  const { data, error } = useCurrentUser();
  const loading = !data && !error;

  return (
    <Wrapper>
      <div className={styles.root}>
        {loading ? (
          <LoadingDots>Loading</LoadingDots>
        ) : data?.user ? (
          <PosterInner user={data.user} />
        ) : (
          <Text color="secondary">
            Please{' '}
            <Link href="/login" passHref legacyBehavior>
              <TextLink color="link" variant="highlight">
                sign in
              </TextLink>
            </Link>{' '}
          </Text>
        )}
      </div>
    </Wrapper>
  );
};

export default Poster;
