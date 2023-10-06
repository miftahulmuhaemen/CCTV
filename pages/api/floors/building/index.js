import { ValidateProps } from '@/api-lib/constants';
import { findFloors, deleteFloorById, findFloorsWithBuilding } from '@/api-lib/db';
import { auths, validateBody } from '@/api-lib/middlewares';
import { getMongoDb } from '@/api-lib/mongodb';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.get(async (req, res) => {
  const db = await getMongoDb();

  const floors = await findFloorsWithBuilding(
    db,
  );

  res.json({ floors });
});

export default handler;
