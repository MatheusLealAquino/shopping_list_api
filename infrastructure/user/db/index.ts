import { MongoClient } from 'mongodb';

const url = process.env.MONGO_URL || 'mongodb://localhost:27017/shopping_list';
const dbName = process.env.DATABASE_NAME;
const client = new MongoClient(url);

let db;

const makeDb = async () => {
  if (!db) {
    await client.connect();
    console.log('Connected to database', url);
    db = client.db(dbName);
  }

  return db;
};

export default makeDb;
