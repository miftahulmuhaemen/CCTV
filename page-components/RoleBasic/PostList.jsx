import { Button } from '@/components/Button';
import { Container, Spacer } from '@/components/Layout';
import Wrapper from '@/components/Layout/Wrapper';
import { RoleBasic } from '@/components/Role';
import { Text } from '@/components/Text';
import Link from 'next/link';
import { useRolesPages } from '@/lib/roles';
import styles from './PostList.module.css';

const PostList = () => {
  const { data, size, setSize, isLoadingMore, isReachingEnd, mutate } = useRolesPages();
  const roles = data
    ? data.reduce((acc, val) => [...acc, ...val.roles], [])
    : [];

  return (
    <div className={styles.root}>
      <Spacer axis="vertical" size={1} />
      <Wrapper>
        {roles.map((role) => (
        <Link
          key={role._id}
          href={`/role-detail/${role._id}`}
          passHref
          legacyBehavior>
          <div className={styles.wrap}>
            <RoleBasic  className={styles.post} role={role} mutate={mutate} />
          </div>
        </Link>
        ))}
        <Container justifyContent="center">
          {isReachingEnd ? (
            <Text color="secondary">No more roles are found</Text>
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
