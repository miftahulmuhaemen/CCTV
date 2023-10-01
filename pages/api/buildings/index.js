import { ValidateProps } from '@/api-lib/constants';
import { findBuildings, insertBuilding } from '@/api-lib/db';
import { auths, validateBody } from '@/api-lib/middlewares';
import { getMongoDb } from '@/api-lib/mongodb';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.get(async (req, res) => {
  const db = await getMongoDb();

  const buildings = await findBuildings(
    db,
    req.query.limit ? parseInt(req.query.limit, 10) : undefined
  );

  res.json({ buildings });
});

handler.post(
  ...auths,
  validateBody({
    type: 'object',
    properties: {
      name: ValidateProps.building.name,
    },
    required: ['name'],
    additionalProperties: false,
  }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).end();
    }

    const db = await getMongoDb();
    const building = await insertBuilding(db, {
      name: req.body.name,
    });

    return res.json({ building });
  }
);

export default handler;
