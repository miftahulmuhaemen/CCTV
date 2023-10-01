import { findBuildingById } from '@/api-lib/db';
import { getMongoDb } from '@/api-lib/mongodb';
import { Floor } from '@/page-components/Floor';
import Head from 'next/head';

export default function UserPostPage({ building }) {
  return (
    <>
      <Head>
        <title>Lantai</title>
      </Head>
      <Floor building={building}/>
    </>
  );
}

export async function getServerSideProps(context) {
  const db = await getMongoDb();

  const building = await findBuildingById(db, context.params.buildingId);
  if (!building) {
    return {
      notFound: true,
    };
  }

  building._id = String(building._id);
  building.name = String(building.name);
  return { props: { building } };
}
