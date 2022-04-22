import { MongoClient } from 'mongodb';

const url = process.env.MONGO_URL || 'mongodb://localhost:27017/shopping_list';
const dbName = process.env.DATABASE_NAME;
const client = new MongoClient(url);

let db;

const makeDb = async () => {
	console.log('initializing db...');
	if (!db) {
		try {
			await client.connect();
			console.log('Connected to database', url);
			db = client.db(dbName);
		} catch (err) {
			console.error(err);
			throw err;
		}
	}

	return db;
};

const closeDb = async () => {
	db = null;
	return client.close();
};

export default {
	makeDb,
	closeDb,
};
