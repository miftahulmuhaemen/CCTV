import styles from './User.module.css';
import UserHeader from './UserHeader';
import UserPosts from './UserPosts';
import Poster from './UserRegister';
import PosterList from './UserRegisterList';

export const User = ({ user }) => {
  return (
    <div className={styles.root}>
      <UserHeader user={user} />
      <UserPosts user={user} />
    </div>
  );
};

export const UserRegister = () => {
  return (
    <div className={styles.root}>
      <Poster />
      <PosterList />
    </div>
  );
}