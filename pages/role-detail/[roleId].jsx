import { findRolesWithFloorById, findBuildings } from '@/api-lib/db';
import { getMongoDb } from '@/api-lib/mongodb';
import { Role } from '@/page-components/Role';
import Head from 'next/head';

export default function UserRolePage({ role, buildings }) {
  return (
    <>
      <Head>
        <title>Role</title>
      </Head>
      <Role role={role} buildings={buildings}/>
    </>
  );
}

export async function getServerSideProps(context) {
  const db = await getMongoDb();
  const role = await findRolesWithFloorById(db, context.params.roleId);
  if (!role) {
    return {
      notFound: true,
    };
  }
  const getBuildings = await findBuildings(db);
  const buildings = getBuildings?.map((building) => {
    const buildingFloors = building.floors ? building.floors.map((floor) => {
      return {
        _id: String(floor._id),
        name: String(floor.name)
      };
    }) : null;
    building._id = String(building._id);
    building.name = String(building.name);
    building.floors = buildingFloors;
    return building;
  })

  const floors = role.floorAccess ? role.floorAccess.map((floor) => {
    return String(floor);
  }) : null;
  role._id = String(role._id);
  role.name = String(role.name);  
  role.floorAccess = floors;
  
  return { props: { role, buildings } };
}
