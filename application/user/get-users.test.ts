import infrastructureUserDb from '../../infrastructure/user/db';
import usersDb from '../../interfaces/user/data-access';

import makeAddUser from './add-user';
import makeGetUsers from './get-users';

beforeEach(async () => {
	await usersDb.clearCollection();
});

afterAll(async () => {
	await infrastructureUserDb.closeDb();
});

describe('makeGetUsers', () => {
	test('when user already created then return user', async () => {
		const addUser = makeAddUser({
			usersDb,
		});

		await addUser({
			email: 'matheus@gmail.com',
			name: 'Matheus Leal',
			password: '12356',
		});

		const getUsers = makeGetUsers({
			usersDb,
		});

		const foundUsers = await getUsers();

		expect(foundUsers[0]._id).toBeDefined();
		expect(foundUsers[0].email).toBe('matheus@gmail.com');
		expect(foundUsers[0].name).toBeDefined();
		expect(foundUsers[0].isActive).toBeDefined();
		expect(foundUsers[0].isAdmin).toBeDefined();
		expect(foundUsers[0].createdAt).toBeDefined();
	});

	test('when dont have users then return empty array', async () => {
		const getUsers = makeGetUsers({
			usersDb,
		});

		const foundUser = await getUsers();

		expect(foundUser[0]).toBeUndefined();
	});
});
