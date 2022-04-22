import { ObjectId } from 'bson';
import mongoConnectionAdapter from '../../../infrastructure/db/mongoConnectionAdapter';
import makeUserMongo from '../../../interfaces/user/data-access/user-mongo';

import makeAddUser from '../add-user/add-user';
import makeGetUserById from './get-user-byId';

let userRepository;
beforeAll(async () => {
	const connection = await mongoConnectionAdapter.makeDb();
	userRepository = makeUserMongo({
		db: connection,
	});
});

beforeEach(async () => {
	await userRepository.clearCollection();
});

afterAll(async () => {
	await mongoConnectionAdapter.closeDb();
});

describe('makeGetUserById', () => {
	test('when user already created then return user', async () => {
		const addUser = makeAddUser({
			userRepository,
		});

		const insertedUser = await addUser({
			email: 'matheus@gmail.com',
			name: 'Matheus Leal',
			password: '12356',
		});

		const getUser = makeGetUserById({
			userRepository,
		});

		const foundUser = await getUser({
			_id: insertedUser._id,
		});

		expect(foundUser._id.toString()).toBe(foundUser._id.toString());
		expect(foundUser.createdAt).toBeDefined();
		expect(foundUser.email).toBe('matheus@gmail.com');
	});

	test('when dont find user then return null', async () => {
		const getUser = makeGetUserById({
			userRepository,
		});

		const foundUser = await getUser({
			_id: new ObjectId(),
		});

		expect(foundUser).toBeNull();
	});
});
