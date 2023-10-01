import { UserRegister } from '@/page-components/User';
import Head from 'next/head';

const UserPage = () => {
  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <UserRegister />
    </>
  );
};

export default UserPage;
