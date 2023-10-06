import { ObjectId } from "mongodb";

export async function findRoles(db) {
    return db
      .collection('roles')
      .aggregate([
        { $match: { name: { $ne: 'Superadmin' }} },        
        { $sort: { _id: -1 } },
      ])
      .toArray();
  }

export async function findFloorsByRoleId(db, id) {
  return db
    .collection('roles')
    .aggregate([
      { $match: {
        _id: new ObjectId(id)
      } },     
      { $unwind: { 
          path: '$floorAccess',
          preserveNullAndEmptyArrays: false
      }},        
      {
        $lookup: {
          from: 'floors',
          localField: 'floorAccess',
          foreignField: '_id',
          as: 'floor',
        },
      },
      { $unwind: { 
          path: '$floor',
          preserveNullAndEmptyArrays: false
      }},
      // {
      //   $group: {
      //     _id: '$_id',
      //     floor: {
      //       $push: '$floor'
      //     }
      //   }
      // }      
    ])
    .toArray();
}

  export async function findRolesWithFloorById(db, id) {
    const roles = await db
      .collection('roles')
      .aggregate([
        { $match: {
          _id: new ObjectId(id)
        } },     
        // { $unwind: { 
        //     path: "$floorAccess",
        //     preserveNullAndEmptyArrays: false
        //   },
        // },
        // {
        //   $lookup: {
        //     from: 'floors',
        //     localField: 'floorAccess',
        //     foreignField: '_id',
        //     as: 'floor',
        //   },
        // },
        // { $unwind: { 
        //     path: "$floor",
        //     preserveNullAndEmptyArrays: false
        //   },
        // },
        // { $unset: 'floorAccess' },
        // { $group: {
        //     _id: '$_id',
        //     name: { $first: "$name"},
        //     floors: { $push: '$floor'}
        //  } }
      ])
      .toArray();
    if (!roles)
      return null;
    return roles[0];
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
  return db
    .collection('roles')
    .deleteOne({ '_id': ObjectId(id) })
}

export async function insertRole(db, { name }) {
  const role = {
    name,
  };
  const { insertedId } = await db.collection('roles').insertOne(role);
  role._id = insertedId;
  return role;
}

export async function addFloorRole(db, { id, floorAccess }) {
  console.log(floorAccess)
  return db
    .collection('roles')
    .updateOne({ '_id': ObjectId(id) }, {
      $addToSet : { floorAccess: new ObjectId(floorAccess) },
    })
}

export async function removeFloorRole(db, { id, floorAccess }) {
  return db
    .collection('roles')
    .updateOne({ '_id': ObjectId(id) }, {
      $pull : {floorAccess: new ObjectId(floorAccess)}
    })
}

export async function updateRoleById(db, { id, name, floorAccess }) {
  const objectFloorAccess = floorAccess.map((floor) => new ObjectId(floor));
  const role = {
    name,
    floorAccess: objectFloorAccess,
  };
  return db
    .collection('roles')
    .updateOne({ '_id': ObjectId(id) }, {
      $set: role,
    })
}