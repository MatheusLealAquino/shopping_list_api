import makeAddAdminUser from './add-admin-user';
import infrastructureUserDb from '../../infrastructure/user/db';
import usersDb from '../../interfaces/user/data-access';

beforeEach(async () => {
	await usersDb.clearCollection();
});

afterAll(async () => {
	await infrastructureUserDb.closeDb();
});

describe('makeAddAdminUser', () => {
	test('when receive user data then insert on database', async () => {
		const addAdminUser = makeAddAdminUser({
			usersDb,
		});

		await addAdminUser({
			email: 'matheus@gmail.com',
			name: 'Matheus Leal',
			password: '12356',
		});

		expect(await usersDb.countUsers()).toBe(1);
	});

	test('when dont receive password then throw error', async () => {
		try {
			const addAdminUser = makeAddAdminUser({
				usersDb,
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
			usersDb,
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
