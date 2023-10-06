import { ValidateProps } from '@/api-lib/constants';
import { findRoles, insertRole, updateRoleById, deleteRoleById} from '@/api-lib/db';
import { auths, validateBody } from '@/api-lib/middlewares';
import { getMongoDb } from '@/api-lib/mongodb';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.get(async (req, res) => {
  const db = await getMongoDb();

  const roles = await findRoles(
    db,
  );

  console.log(roles)

  res.json({ roles });
});

handler.patch(
  ...auths,
  validateBody({
    type: 'object',
    properties: {
      name: ValidateProps.role.name,
      floorAccess: ValidateProps.role.floorAccess,
    },
    required: ['name', 'floorAccess'],
    additionalProperties: false,
  }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).end();
    }

    const db = await getMongoDb();
    const role = await updateRoleById(db, {
      id: req.body.id,
      name: req.body.name,
      floorAccess: req.body.floorAccess,
    });

    return res.json({ role });
  }
);


handler.post(
  ...auths,
  validateBody({
    type: 'object',
    properties: {
      name: ValidateProps.role.name,
      floorAccess: ValidateProps.role.floorAccess,
    },
    required: ['name', 'floorAccess'],
    additionalProperties: false,
  }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).end();
    }

    const db = await getMongoDb();
    const role = await insertRole(db, {
      name: req.body.name,
      floorAccess: req.body.floorAccess,
    });

    return res.json({ role });
  }
);


handler.delete(async (req, res) => {
  const db = await getMongoDb();
  await deleteRoleById(
    db,
    req.body.id
  );

  res.json({ 
    status: '200',
   });
})

export default handler;
