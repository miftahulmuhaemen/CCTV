import { Spacer } from '@/components/Layout';
import { Card } from '@/components/Card';
import { CameraCard } from '@/components/Camera-Card';
import { CameraCardStandard } from '@/components/Camera-Standard';
import { Container, Wrapper, FullWrapper } from '@/components/Layout';
import styles from './Feed.module.css';
import Poster from './Poster';
import PostList from './PostList';

export const Floor = ({ building }) => {
  return (
    <div className={styles.root}>
      <Spacer size={1} axis="vertical" />
      <Poster building={building} />
      <PostList building={building}/>
    </div>
  );
};

export const UserFloor = ({ floors }) => {
  return (
    <div className={styles.root}>
      <Spacer size={1} axis="vertical" />
      <Wrapper>
        <Card floors={floors}></Card>
      </Wrapper>
      <Spacer size={1} axis="vertical" />
    </div>
  );
};

export const UserFloorCameras = ({ floor }) => {
  return (
    <div className={styles.root}>
      <Spacer size={1} axis="vertical" />
      {
        floor?.isFullSize
        ? <FullWrapper>
            <CameraCard floor={floor}></CameraCard>
          </FullWrapper>
        : <Wrapper>
            <CameraCardStandard floor={floor}></CameraCardStandard>
          </Wrapper>
      }
      <Spacer size={1} axis="vertical" />
    </div>
  );
};
