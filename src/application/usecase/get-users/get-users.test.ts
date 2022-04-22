import mongoConnectionAdapter from '../../../infrastructure/db/mongoConnectionAdapter';
import makeUserMongo from '../../../interfaces/user/data-access/user-mongo';

import makeAddUser from '../add-user/add-user';
import makeGetUsers from './get-users';

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

describe('makeGetUsers', () => {
	test('when user already created then return user', async () => {
		const addUser = makeAddUser({
			userRepository,
		});

		await addUser({
			email: 'matheus@gmail.com',
			name: 'Matheus Leal',
			password: '12356',
		});

		const getUsers = makeGetUsers({
			userRepository,
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
			userRepository,
		});

		const foundUser = await getUsers();

		expect(foundUser[0]).toBeUndefined();
	});
});
