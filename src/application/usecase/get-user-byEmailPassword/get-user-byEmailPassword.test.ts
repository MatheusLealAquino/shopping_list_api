import mongoConnectionAdapter from '../../../infrastructure/db/mongoConnectionAdapter';
import makeUserMongo from '../../../interfaces/data-access/user-mongo';

import makeAddUser from '../add-user/add-user';
import makeGetUserByEmailPassword from './get-user-byEmailPassword';

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

describe('makeGetUserByEmailPassword', () => {
	test('when user already created and password match then return user', async () => {
		const addUser = makeAddUser({
			userRepository,
		});

		await addUser({
			email: 'matheus@gmail.com',
			name: 'Matheus Leal',
			password: '12356',
		});

		const getUser = makeGetUserByEmailPassword({
			userRepository,
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
			userRepository,
		});

		await addUser({
			email: 'matheus@gmail.com',
			name: 'Matheus Leal',
			password: '12356',
		});

		const getUser = makeGetUserByEmailPassword({
			userRepository,
		});

		const foundUser = await getUser({
			email: 'matheus@gmail.com',
			password: '1111',
		});

		expect(foundUser).toBeNull();
	});

	test('when dont find user then return null', async () => {
		const getUser = makeGetUserByEmailPassword({
			userRepository,
		});

		const foundUser = await getUser({
			email: 'matheus2@gmail.com',
		});

		expect(foundUser).toBeNull();
	});
});
