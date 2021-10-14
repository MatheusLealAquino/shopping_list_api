import makeAddUser from '../add-user';
import infrastructureUserDb from '../../../infrastructure/user/db';
import usersDb from '../../../interfaces/user/data-access';

beforeEach(async () => {
	await usersDb.clearCollection();
});

afterAll(async () => {
	await infrastructureUserDb.closeDb();
});

describe('makeAddUser', () => {
	test('when receive user data then insert on database', async () => {
		const addUser = makeAddUser({
			usersDb,
		});

		await addUser({
			email: 'matheus@gmail.com',
			name: 'Matheus Leal',
			password: '12356',
		});

		expect(await usersDb.countUsers()).toBe(1);
	});

	test('when dont receive password then throw error', async () => {
		const addUser = makeAddUser({
			usersDb,
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
			usersDb,
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
