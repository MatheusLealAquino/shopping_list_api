import makeAddAdminUser from './add-admin-user';
import mongoConnectionAdapter from '../../../infrastructure/db/mongoConnectionAdapter';
import makeUserMongo from '../../../interfaces/user/data-access/user-mongo';

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

describe('makeAddAdminUser', () => {
	test('when receive user data then insert on database', async () => {
		const addAdminUser = makeAddAdminUser({
			userRepository,
		});

		await addAdminUser({
			email: 'matheus@gmail.com',
			name: 'Matheus Leal',
			password: '12356',
		});

		expect(await userRepository.countUsers()).toBe(1);
	});

	test('when dont receive password then throw error', async () => {
		try {
			const addAdminUser = makeAddAdminUser({
				userRepository,
			});

			await addAdminUser({
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
		const addAdminUser = makeAddAdminUser({
			userRepository,
		});

		try {
			await addAdminUser({
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
