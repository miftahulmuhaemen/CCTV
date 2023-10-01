import { Button } from '@/components/Button';
import { Container, Spacer } from '@/components/Layout';
import Wrapper from '@/components/Layout/Wrapper';
import { Floor } from '@/components/Floor';
import { Text } from '@/components/Text';
import { useFloorPagesByBuilding } from '@/lib/floor';
import Link from 'next/link';
import styles from './PostList.module.css';

const PostList = ({ building: building }) => {
  const { data, size, setSize, isLoadingMore, isReachingEnd } = useFloorPagesByBuilding(
    { buildingId: building._id }
  );
  const floors = data
    ? data.reduce((acc, val) => [...acc, ...val.floors], [])
    : [];

  return (
    <div className={styles.root}>
      <Spacer axis="vertical" size={1} />
      <Wrapper>
        {floors.map((floor) => (
            <div className={styles.wrap}>
              <Floor className={styles.post} floor={floor} />
            </div>
        ))}
        <Container justifyContent="center">
          {isReachingEnd ? (
            <Text color="secondary">No more floors are found</Text>
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
