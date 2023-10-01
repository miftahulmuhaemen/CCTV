import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';
import normalizeEmail from 'validator/lib/normalizeEmail';

export async function findUsers(db, limit = 10) {
  return db
  .collection('users')
  .aggregate([
    { $limit: limit },
    {
      $lookup: {
        from: 'roles',
        localField: 'role',
        foreignField: '_id',
        as: 'role',
      },
    },
    { $unwind: { 
        path: "$role",
        preserveNullAndEmptyArrays: true
      },
    },
    { $addFields: { floorAccess: "$role.floorAccess" } },
    { $project: { "role.floorAccess": 0 } },
  ])
  .toArray();
}

export async function findFloorsByUsername(db, username) {
  return db
  .collection('users')
  .aggregate([
    { $match: { username } },
    {
      $lookup: {
        from: 'roles',
        localField: 'role',
        foreignField: '_id',
        as: 'role',
      },
    },
    { $unwind: { 
        path: "$role",
        preserveNullAndEmptyArrays: false
      },
    },
    { $addFields: { floorAccess: "$role.floorAccess" } },
    { $unwind: { 
        path: "$floorAccess",
        preserveNullAndEmptyArrays: false
      },
    },
    {
      $lookup: {
        from: "floors",
        localField: "floorAccess",
        foreignField: "_id",
        as: "floor",
      },
    },
    { $unwind: { 
        path: "$floor",
        preserveNullAndEmptyArrays: false
      },
    },
    { $addFields: { cameraIPs: '$floor.cameraIPs' } },
    { $unset: ['password', 'bio', 'floorAccess', 'floor.cameraIPs', 'role.floorAccess'] },
  ])
  .toArray();
}

export async function findUserWithEmailAndPassword(db, email, password) {
  email = normalizeEmail(email);
  const users = await db
  .collection('users')
  .aggregate([
    { $match: { email } },
    {
      $lookup: {
        from: 'roles',
        localField: 'role',
        foreignField: '_id',
        as: 'role',
      },
    },
    { $unwind: { 
        path: "$role",
        preserveNullAndEmptyArrays: true
      },
    },
    { $addFields: { floorAccess: "$role.floorAccess" } },
    { $project: { "role.floorAccess": 0 } },
  ])
  .toArray();

  if (!users)
    return null;

  const user = users[0];
  if (user && (await bcrypt.compare(password, user.password))) {
    return { ...user, password: undefined }; // filtered out password
  }
  return null;
}

export async function findUserForAuth(db, userId) {
  const users = await db
  .collection('users')
  .aggregate([
    { $match: { _id: userId } },
    {
      $lookup: {
        from: 'roles',
        localField: 'role',
        foreignField: '_id',
        as: 'role',
      },
    },
    { $unwind: { 
        path: "$role",
        preserveNullAndEmptyArrays: true
      },
    },
    { $addFields: { floorAccess: "$role.floorAccess" } },
    { $project: { "role.floorAccess": 0 } },
  ])
  .toArray();

  if (!users)
    return null;
  return users[0];
}

export async function findUserById(db, userId) {
  return db
    .collection('users')
    .findOne({ _id: new ObjectId(userId) }, { projection: dbProjectionUsers() })
    .then((user) => user || null);
}

export async function findUserByUsername(db, username) {
  return db
    .collection('users')
    .findOne({ username }, { projection: dbProjectionUsers() })
    .then((user) => user || null);
}

export async function findUserByEmail(db, email) {
  email = normalizeEmail(email);
  return db
    .collection('users')
    .findOne({ email }, { projection: dbProjectionUsers() })
    .then((user) => user || null);
}

export async function updateUserById(db, id, data) {
  return db
    .collection('users')
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: data },
      { returnDocument: 'after', projection: { password: 0 } }
    )
    .then(({ value }) => value);
}

export async function insertUser(
  db,
  { email, originalPassword, bio = '', name, profilePicture, username, role }
) {
  const user = {
    emailVerified: false,
    profilePicture,
    email,
    name,
    username,
    bio,
    role: new ObjectId(role),
  };
  const password = await bcrypt.hash(originalPassword, 10);
  const { insertedId } = await db
    .collection('users')
    .insertOne({ ...user, password });
  user._id = insertedId;
  return user;
}

export async function updateUserPasswordByOldPassword(
  db,
  id,
  oldPassword,
  newPassword
) {
  const user = await db.collection('users').findOne(new ObjectId(id));
  if (!user) return false;
  const matched = await bcrypt.compare(oldPassword, user.password);
  if (!matched) return false;
  const password = await bcrypt.hash(newPassword, 10);
  await db
    .collection('users')
    .updateOne({ _id: new ObjectId(id) }, { $set: { password } });
  return true;
}

export async function UNSAFE_updateUserPassword(db, id, newPassword) {
  const password = await bcrypt.hash(newPassword, 10);
  await db
    .collection('users')
    .updateOne({ _id: new ObjectId(id) }, { $set: { password } });
}

export function dbProjectionUsers(prefix = '') {
  return {
    [`${prefix}password`]: 0,
    [`${prefix}email`]: 0,
    [`${prefix}emailVerified`]: 0,
  };
}
