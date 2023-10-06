import { ValidateProps } from '@/api-lib/constants';
import { findFloorsByRoleId, addFloorRole, removeFloorRole } from '@/api-lib/db';
import { auths, validateBody } from '@/api-lib/middlewares';
import { getMongoDb } from '@/api-lib/mongodb';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.get(async (req, res) => {
  const db = await getMongoDb();

  const roles = await findFloorsByRoleId(
    db,
    req.query.id
  );

  res.json({ roles });
});

handler.post(async (req, res) => {
  const db = await getMongoDb();

  const roles = await addFloorRole(
    db,
    {
      id: req.body.id,
      floorAccess: req.body.floorAccess
    }
  );

  res.json({ roles });
});

handler.delete(async (req, res) => {
  const db = await getMongoDb();
  await removeFloorRole(
    db,
    {
      id: req.body.id,
      floorAccess: req.body.floorAccess
    }
  );

  res.json({ 
    status: '200',
   });
})

export default handler;
