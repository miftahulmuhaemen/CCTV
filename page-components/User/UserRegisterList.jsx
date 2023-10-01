import { Button } from '@/components/Button';
import { Container, Spacer } from '@/components/Layout';
import Wrapper from '@/components/Layout/Wrapper';
import { User } from '@/components/User';
import { Text } from '@/components/Text';
import { useUserPages } from '@/lib/user';
import Link from 'next/link';
import styles from './UserRegisterList.module.css';

const PostList = () => {
  const { data, size, setSize, isLoadingMore, isReachingEnd } = useUserPages();
  const users = data
    ? data.reduce((acc, val) => [...acc, ...val.users], [])
    : [];

  return (
    <div className={styles.root}>
      <Spacer axis="vertical" size={1} />
      <Wrapper>
        {users.map((user) => (
            <div className={styles.wrap}>
              <User className={styles.post} user={user} />
            </div>
        ))}
        <Container justifyContent="center">
          {isReachingEnd ? (
            <Text color="secondary">No more user are found</Text>
          ) : (
            <Button
              variant="ghost"
              type="success"
              loading={isLoadingMore}
              onClick={() => setSize(size + 1)}
            >
              Load more
            </Button>
          )}
        </Container>
      </Wrapper>
    </div>
  );
};

export default PostList;
