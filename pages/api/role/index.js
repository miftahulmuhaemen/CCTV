import { ValidateProps } from '@/api-lib/constants';
import { findRoles, insertRole, updateRoleById} from '@/api-lib/db';
import { auths, validateBody } from '@/api-lib/middlewares';
import { getMongoDb } from '@/api-lib/mongodb';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.post(
  ...auths,
  validateBody({
    type: 'object',
    properties: {
      name: ValidateProps.role.name,
    },
    required: ['name'],
    additionalProperties: false,
  }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).end();
    }

    const db = await getMongoDb();
    const role = await insertRole(db, {
      name: req.body.name,
    });

    return res.json({ role });
  }
);

export default handler;
