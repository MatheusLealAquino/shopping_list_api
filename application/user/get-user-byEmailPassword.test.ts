import infrastructureUserDb from '../../infrastructure/user/db';
import usersDb from '../../interfaces/user/data-access';

import makeAddUser from './add-user';
import makeGetUserByEmailPassword from './get-user-byEmailPassword';

beforeEach(async () => {
	await usersDb.clearCollection();
});

afterAll(async () => {
	await infrastructureUserDb.closeDb();
});

describe('makeGetUserByEmailPassword', () => {
	test('when user already created and password match then return user', async () => {
		const addUser = makeAddUser({
			usersDb,
		});

		await addUser({
			email: 'matheus@gmail.com',
			name: 'Matheus Leal',
			password: '12356',
		});

		const getUser = makeGetUserByEmailPassword({
			usersDb,
		});

		const foundUser = await getUser({
			email: 'matheus@gmail.com',
			password: '12356',
		});

		expect(foundUser._id).toBeDefined();
		expect(foundUser.createdAt).toBeDefined();
		expect(foundUser.email).toBe('matheus@gmail.com');
	});

	test('when user already created and password dont match then return null', async () => {
		const addUser = makeAddUser({
			usersDb,
		});

		await addUser({
			email: 'matheus@gmail.com',
			name: 'Matheus Leal',
			password: '12356',
		});

		const getUser = makeGetUserByEmailPassword({
			usersDb,
		});

		const foundUser = await getUser({
			email: 'matheus@gmail.com',
			password: '1111',
		});

		expect(foundUser).toBeNull();
	});

	test('when dont find user then return null', async () => {
		const getUser = makeGetUserByEmailPassword({
			usersDb,
		});

		const foundUser = await getUser({
			email: 'matheus2@gmail.com',
		});

		expect(foundUser).toBeNull();
	});
});
