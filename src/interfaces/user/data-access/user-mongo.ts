import { ObjectId } from 'bson';

const makeUserMongo = ({ db }) => {
	async function insert({
		...userInfo
	}) {
		const result = await db.collection('users')
			.insertOne({
				...userInfo,
				createdAt: new Date(),
			});

		return { ...userInfo, _id: result.insertedId };
	}

	async function getByEmail({
		email,
	}) {
		return db.collection('users')
			.findOne({
				email,
			});
	}

	async function getById({
		_id,
	}) {
		return db.collection('users')
			.findOne({
				_id: new ObjectId(_id.toString()),
			});
	}

	async function getUsers() {
		return db.collection('users')
			.find().toArray();
	}

	async function countUsers() {
		return db.collection('users')
			.find()
			.count();
	}

	async function clearCollection() {
		if (process.env.NODE_ENV === 'dev') {
			return db.collection('users')
				.deleteMany({});
		}

		return Promise.resolve();
	}

	return Object.freeze({
		insert,
		getByEmail,
		getById,
		getUsers,
		countUsers,
		clearCollection,
	});
};

export default makeUserMongo;
