import { Spacer } from '@/components/Layout';
import styles from './Feed.module.css';
import Poster from './Poster';
import PostList from './PostList';

export const Role = ({ role, buildings }) => {
  return (
    <div className={styles.root}>
      <Spacer size={1} axis="vertical" />
      <Poster role={role} buildings={buildings}/>
      <PostList role={role}/>
    </div>
  );
};

// export const Role = () => {
//   return (
//     <div className={styles.root}>
//       <Spacer size={1} axis="vertical" />
//       <Poster />
//       <PostList />
//     </div>
//   );
// };
