import { ValidateProps } from '@/api-lib/constants';
import { findRoles, insertRole } from '@/api-lib/db';
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

  res.json({ roles });
});

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

export default handler;
