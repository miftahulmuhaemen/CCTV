import { findFloorsByUsername } from '@/api-lib/db';
import { getMongoDb } from '@/api-lib/mongodb';
import { UserFloor } from '@/page-components/Floor';
import Head from 'next/head';

export default function UserFloorPage({ floors }) {
  return (
    <>
      <Head>
        <title>
          User Floors
        </title>
      </Head>
      <UserFloor floors={floors} />
    </>
  );
}

export async function getServerSideProps(context) {
  const db = await getMongoDb();

  const rets = await findFloorsByUsername(db, context.params.username);
  if (!rets) {
    return {
      notFound: true,
    };
  }

  const floors = rets.map((floor) => {
    const cameraIPs = floor.cameraIPs.map((camera) => {
      return {
        ip: String(camera.ip),
        name: String(camera.name),
      };
    });
    return {
      user: {
        username: String(floor.username)
      },
      role: {
        _id: String(floor.role._id),
        name: String(floor.role.name),
      },
      floor: {
        _id: String(floor.floor._id),
        name: String(floor.floor.name),
      },
      cameraIPs: cameraIPs
    }
  })
  return { props: { floors } };
}

