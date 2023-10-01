import { ObjectId } from "mongodb";

export async function findRoles(db) {
    return db
      .collection('roles')
      .aggregate([
        { $sort: { _id: -1 } },
      ])
      .toArray();
  }

export async function findRolesWithFloors(db, limit = 10) {
  return db
    .collection('roles')
    .aggregate([
      { $limit: limit },
      { $unwind: { 
          path: "$floorAccess",
          preserveNullAndEmptyArrays: false
        },
      },
      {
        $lookup: {
          from: 'floors',
          localField: 'floorAccess',
          foreignField: '_id',
          as: 'floor',
        },
      },
      { $unwind: { 
          path: "$floor",
          preserveNullAndEmptyArrays: false
        },
      },
      { $unset: 'floorAccess' },
      { $group: {
          _id: '$_id',
          name: { $first: "$name"},
          floors: { $push: '$floor'}
       } }
    ])
    .toArray();
}

export async function deleteRoleById(db, id) {
  console.log(id)
  return db
    .collection('roles')
    .deleteOne({ '_id': ObjectId(id) })
}

export async function insertRole(db, { name, floorAccess }) {
  const objectFloorAccess = floorAccess.map((floor) => new ObjectId(floor));
  const role = {
    name,
    floorAccess: objectFloorAccess,
  };
  const { insertedId } = await db.collection('roles').insertOne(role);
  role._id = insertedId;
  return role;
}
