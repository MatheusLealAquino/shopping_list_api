import { ObjectId } from 'bson';

const makeUsersDb = ({ makeDb }) => {
	async function insert({
		...userInfo
	}) {
		const db = await makeDb();

		const result = await db
			.collection('users')
			.insertOne({
				...userInfo,
			});

		return { ...userInfo, _id: result.insertedId };
	}

	async function getByEmail({
		email,
	}) {
		const db = await makeDb();

		return db
			.collection('users')
			.findOne({
				email,
			});
	}

	async function getById({
		_id,
	}) {
		const db = await makeDb();

		return db
			.collection('users')
			.findOne({
				_id: new ObjectId(_id.toString()),
			});
	}

	async function getUsers() {
		const db = await makeDb();

		return db
			.collection('users')
			.find().toArray();
	}

	async function countUsers() {
		const db = await makeDb();

		return db
			.collection('users')
			.find()
			.count();
	}

	async function clearCollection() {
		if (process.env.NODE_ENV === 'dev') {
			const db = await makeDb();

			return db
				.collection('users')
				.remove();
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

export default makeUsersDb;
