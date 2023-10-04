import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';

let indexesCreated = false;
async function createIndexes(client) {
  if (indexesCreated) return client;
  const db = client.db();
  const superAdminObjectID = new ObjectId('65159fdfb18da3ad9417fa9e');
  const superAdminPassword = await bcrypt.hash(process.env.SUPERADMIN_PASSWORD, 10);
  await Promise.all([
    db
      .collection('tokens')
      .createIndex({ expireAt: -1 }, { expireAfterSeconds: 0 }),
    db.collection('users').createIndexes([
      { key: { email: 1 }, unique: true },
      { key: { username: 1 }, unique: true },
    ]),
    db
      .collection('roles')
      .updateOne(
      {
        _id: superAdminObjectID,
      },
      { $set: {
        _id: superAdminObjectID,
        name: 'Superadmin'
      }},
      { upsert: true }),
    db
      .collection('users')
      .updateOne(
        {
          name: 'Superadmin',
        },
        { $set: {
          name: 'Superadmin',
          email: process.env.SUPERADMIN_EMAIL,
          name: 'Superadmin',
          username: process.env.SUPERADMIN_USERNAME,
          role: superAdminObjectID,
          password: superAdminPassword,
        }},
      { upsert: true }),
  ]);
  indexesCreated = true;
  return client;
}

export async function getMongoClient() {
  /**
   * Global is used here to maintain a cached connection across hot reloads
   * in development. This prevents connections growing exponentiatlly
   * during API Route usage.
   * https://github.com/vercel/next.js/pull/17666
   */
  if (!global.mongoClientPromise) {
    const client = new MongoClient(process.env.MONGODB_URI);
    // client.connect() returns an instance of MongoClient when resolved
    global.mongoClientPromise = client
      .connect()
      .then((client) => createIndexes(client));
  }
  return global.mongoClientPromise;
}

export async function getMongoDb() {
  const mongoClient = await getMongoClient();
  return mongoClient.db();
}
