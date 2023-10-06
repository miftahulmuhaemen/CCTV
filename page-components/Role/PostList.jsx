import { Button } from '@/components/Button';
import { Container, Spacer } from '@/components/Layout';
import Wrapper from '@/components/Layout/Wrapper';
import { RoleFloor } from '@/components/Floor';
import { Text } from '@/components/Text';
import { useRolesPagesWithFloors } from '@/lib/roles';
import styles from './PostList.module.css';

const PostList = ({ role }) => {
  const { data, size, setSize, isLoadingMore, isReachingEnd, mutate } = useRolesPagesWithFloors({
    id: role._id,
  });
  const roles = data
    ? data.reduce((acc, val) => [...acc, ...val.roles], [])
    : [];

  return (
    <div className={styles.root}>
      <Spacer axis="vertical" size={1} />
      <Wrapper>
        {roles.map((role) => (
            <div className={styles.wrap}>
              <RoleFloor className={styles.post} role={role} mutate={mutate} />
            </div>
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
