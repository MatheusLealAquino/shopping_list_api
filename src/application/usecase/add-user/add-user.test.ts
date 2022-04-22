import mongoConnectionAdapter from '../../../infrastructure/db/mongoConnectionAdapter';

import makeAddUser from './add-user';
import makeUserMongo from '../../../interfaces/data-access/user-mongo';

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

describe('makeAddUser', () => {
	test('when receive user data then insert on database', async () => {
		const addUser = makeAddUser({
			userRepository,
		});

		await addUser({
			email: 'matheus@gmail.com',
			name: 'Matheus Leal',
			password: '12356',
		});

		expect(await userRepository.countUsers()).toBe(1);
	});

	test('when dont receive password then throw error', async () => {
		const addUser = makeAddUser({
			userRepository,
		});

		try {
			await addUser({
				email: 'matheus@gmail.com',
				name: 'Matheus Leal',
				password: '',
			});
		} catch (err) {
			const error = err as Error;
			expect(error.message).toBe('Necessary to receive password');
		}
	});

	test('when email is empty then throw error', async () => {
		const addUser = makeAddUser({
			userRepository,
		});

		try {
			await addUser({
				email: '',
				name: 'Matheus Leal',
				password: '123456',
			});
		} catch (err) {
			const error = err as Error;
			expect(error.message).toBe('Necessary to receive email');
		}
	});
});
