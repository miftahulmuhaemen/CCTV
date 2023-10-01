import { ObjectId } from 'mongodb';
export async function findFloorsByBuilding(db, id, limit = 10) {
    return db
    .collection('floors')
    .aggregate([
      { $match: { buildingId: new ObjectId(id) } },
      { $sort: { _id: -1 } },
      { $limit: limit },
    ])
    .toArray();
}

export async function findFloors(db, limit = 100) {
  return db
  .collection('floors')
  .aggregate([
    { $sort: { _id: -1 } },
    { $limit: limit },
  ])
  .toArray();
}

export async function findFloorById(db, id) {
  return db
    .collection('floors')
    .findOne({ _id: new ObjectId(id) })
    .then((floor) => floor || null);
}

export async function insertFloor(db, { name, buildingId, cameraIPs }) {
  const floor = {
    name,
    buildingId: new ObjectId(buildingId),
    cameraIPs,
  };
  const { insertedId } = await db.collection('floors').insertOne(floor);
  floor._id = insertedId;
  return floor;
}
