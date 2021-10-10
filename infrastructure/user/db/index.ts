import { MongoClient } from 'mongodb';

require('dotenv').config();

const url = process.env.USERS_DB_URL || 'mongodb://localhost:27017';
const dbName = process.env.USERS_DB_NAME as string;
const client = new MongoClient(url);

const makeDb = async () => {
  await client.connect();
  console.log('Connected to database');
  return client.db(dbName);
};

export default makeDb;
