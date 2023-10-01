import { Button } from '@/components/Button';
import { Container, Spacer } from '@/components/Layout';
import Wrapper from '@/components/Layout/Wrapper';
import { Building } from '@/components/Building';
import { Text } from '@/components/Text';
import { useBuildingPages } from '@/lib/building';
import Link from 'next/link';
import styles from './PostList.module.css';

const PostList = () => {
  const { data, size, setSize, isLoadingMore, isReachingEnd } = useBuildingPages();
  const buildings = data
    ? data.reduce((acc, val) => [...acc, ...val.buildings], [])
    : [];

  return (
    <div className={styles.root}>
      <Spacer axis="vertical" size={1} />
      <Wrapper>
        
        {buildings.map((building) => (
            <Link
              key={building._id}
              href={`/building-detail/${building._id}`}
              passHref
              legacyBehavior>
              <div className={styles.wrap}>
                <Building className={styles.post} building={building} />
              </div>
            </Link>
        ))}
        <Container justifyContent="center">
          {isReachingEnd ? (
            <Text color="secondary">No more buildings are found</Text>
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
