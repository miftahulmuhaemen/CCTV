import { findFloorById } from '@/api-lib/db';
import { getMongoDb } from '@/api-lib/mongodb';
import { UserFloorCameras } from '@/page-components/Floor';
import Head from 'next/head';

export default function UserDetailFloorPage({ floor }) {
  return (
    <>
      <Head>
        <title>
          User Floors
        </title>
      </Head>
      <UserFloorCameras floor={floor} />
    </>
  );
}

export async function getServerSideProps(context) {
  const db = await getMongoDb();

  const floor = await findFloorById(db, context.params.floorId);
  if (!floor) {
    return {
      notFound: true,
    };
  }

  const cameraIPs = floor.cameraIPs.map((camera) => {
    return {
        ip: String(camera.ip),
        name: String(camera.name)
    }
  });

  floor._id = String(floor._id);
  floor.buildingId = String(floor.buildingId);
  floor.name = String(floor.name);
  floor.cameraIPs = cameraIPs;
  return { props: { floor } };
}

