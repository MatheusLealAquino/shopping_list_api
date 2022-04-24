import { ObjectId } from 'bson';

const COLLECTION = 'category';

const makeCategoryMongo = ({ db }) => {
	async function insert({
		...userInfo
	}) {
		const result = await db.collection(COLLECTION)
			.insertOne({
				...userInfo,
				createdAt: new Date(),
			});

		return { ...userInfo, _id: result.insertedId };
	}

	async function getById({
		_id,
	}: {
    _id: ObjectId
  }) {
		return db.collection(COLLECTION)
			.findOne({
				_id,
			});
	}

	async function getByName({
		name,
	}: {
    name: string
  }) {
		return db.collection(COLLECTION)
			.findOne({
				name,
			});
	}

	async function getCategories() {
		return db.collection(COLLECTION)
			.find().toArray();
	}

	async function countCategories() {
		return db.collection(COLLECTION)
			.find()
			.count();
	}

	async function clearCollection() {
		if (process.env.NODE_ENV === 'dev') {
			return db.collection(COLLECTION)
				.deleteMany({});
		}

		return Promise.resolve();
	}

	return Object.freeze({
		insert,
		getById,
		getByName,
		getCategories,
		countCategories,
		clearCollection,
	});
};

export default makeCategoryMongo;
