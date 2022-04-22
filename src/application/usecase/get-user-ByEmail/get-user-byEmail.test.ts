import mongoConnectionAdapter from '../../../infrastructure/db/mongoConnectionAdapter';
import makeUserMongo from '../../../interfaces/user/data-access/user-mongo';

import makeAddUser from '../add-user/add-user';
import makeGetUserByEmail from './get-user-byEmail';

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

describe('makeGetUserByEmail', () => {
	test('when user already created then return user', async () => {
		const addUser = makeAddUser({
			userRepository,
		});

		await addUser({
			email: 'matheus@gmail.com',
			name: 'Matheus Leal',
			password: '12356',
		});

		const getUser = makeGetUserByEmail({
			userRepository,
		});

		const foundUser = await getUser({
			email: 'matheus@gmail.com',
		});

		expect(foundUser._id).toBeDefined();
		expect(foundUser.createdAt).toBeDefined();
		expect(foundUser.email).toBe('matheus@gmail.com');
	});

	test('when dont find user then return null', async () => {
		const addUser = makeAddUser({
			userRepository,
		});

		await addUser({
			email: 'matheus@gmail.com',
			name: 'Matheus Leal',
			password: '12356',
		});

		const getUser = makeGetUserByEmail({
			userRepository,
		});

		const foundUser = await getUser({
			email: 'matheus2@gmail.com',
		});

		expect(foundUser).toBeNull();
	});

	test('when email is empty then throw error', async () => {
		try {
			const addUser = makeAddUser({
				userRepository,
			});

			await addUser({
				email: 'matheus@gmail.com',
				name: 'Matheus Leal',
				password: '12356',
			});

			const getUser = makeGetUserByEmail({
				userRepository,
			});

			await getUser({
				email: '',
			});
		} catch (err) {
			const error = err as Error;
			expect(error.message).toBe('Necessary to receive email');
		}
	});
});
