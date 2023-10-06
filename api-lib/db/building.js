import { ObjectId } from 'mongodb';
export async function findBuildings(db) {
    return db
    .collection('buildings')
    .aggregate([
      {
        $lookup: {
          from: 'floors',
          localField: '_id',
          foreignField: 'buildingId',
          as: 'floors',
        },
      },
    ])
    .toArray();
}

export async function findBuildingById(db, id) {
  const buildings = await db
  .collection('buildings')
    .aggregate([
      { $match: { _id: new ObjectId(id) } },
      { $limit: 1 },
    ])
    .toArray();
  if (!buildings[0]) return null;
  return buildings[0];
}

export async function deleteBuildingById(db, id) {
  return db
    .collection('buildings')
    .deleteOne({ '_id': ObjectId(id) })
}

export async function insertBuilding(db, { name }) {
  const building = {
    name,
  };
  const { insertedId } = await db.collection('buildings').insertOne(building);
  building._id = insertedId;
  return building;
}
