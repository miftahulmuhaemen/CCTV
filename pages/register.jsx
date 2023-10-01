import { SignUp } from '@/page-components/Auth';
import Head from 'next/head';

const RegisterPage = () => {
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <SignUp />
    </>
  );
};

export default RegisterPage;
