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


export async function findFloorsWithBuilding(db) {
  return db
  .collection('floors')
  .aggregate([
    { $lookup: {
      from: 'buildings',
      localField: 'buildingId',
      foreignField: '_id',
      as: 'building'
    } },
    { $unwind: {
      path: '$building',
      preserveNullAndEmptyArrays: true
    } },
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

export async function deleteFloorById(db, id) {
  return db
    .collection('floors')
    .deleteOne({ '_id': ObjectId(id) })
}

export async function updateFloorById(db, { id, name, buildingId, cameraIPs, isFullSize }) {
  const floor = {
    name,
    buildingId: new ObjectId(buildingId),
    cameraIPs,
    isFullSize,
  };
  return db
    .collection('floors')
    .updateOne({ '_id': ObjectId(id) }, {
      $set: floor,
    })
}

export async function insertFloor(db, { name, buildingId, cameraIPs, isFullSize }) {
  const floor = {
    name,
    buildingId: new ObjectId(buildingId),
    cameraIPs,
    isFullSize,
  };
  const { insertedId } = await db.collection('floors').insertOne(floor);
  floor._id = insertedId;
  return floor;
}
