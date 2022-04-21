import { ObjectId } from 'bson';
import infrastructureUserDb from '../../../../infrastructure/user/db';
import usersDb from '../../../../interfaces/user/data-access';

import makeAddUser from '../add-user/add-user';
import makeGetUserById from './get-user-byId';

beforeEach(async () => {
	await usersDb.clearCollection();
});

afterAll(async () => {
	await infrastructureUserDb.closeDb();
});

describe('makeGetUserById', () => {
	test('when user already created then return user', async () => {
		const addUser = makeAddUser({
			usersDb,
		});

		const insertedUser = await addUser({
			email: 'matheus@gmail.com',
			name: 'Matheus Leal',
			password: '12356',
		});

		const getUser = makeGetUserById({
			usersDb,
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
			usersDb,
		});

		const foundUser = await getUser({
			_id: new ObjectId(),
		});

		expect(foundUser).toBeNull();
	});
});
