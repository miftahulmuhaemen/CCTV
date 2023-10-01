import { ValidateProps } from '@/api-lib/constants';
import { findRolesWithFloors, deleteRoleById } from '@/api-lib/db';
import { auths, validateBody } from '@/api-lib/middlewares';
import { getMongoDb } from '@/api-lib/mongodb';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.get(async (req, res) => {
  const db = await getMongoDb();

  const roles = await findRolesWithFloors(
    db,
    req.query.limit ? parseInt(req.query.limit, 10) : undefined
  );

  res.json({ roles });
});

handler.delete(async (req, res) => {
  const db = await getMongoDb();
  const ret = await deleteRoleById(
    db,
    req.body.id
  );

  console.log(ret)

  res.json({ 
    status: '200',
   });
})

export default handler;
