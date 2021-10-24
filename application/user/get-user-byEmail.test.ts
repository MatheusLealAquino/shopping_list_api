import infrastructureUserDb from '../../../infrastructure/user/db';
import usersDb from '../../../interfaces/user/data-access';

import makeAddUser from '../add-user';
import makeGetUserByEmail from '../get-user-byEmail';

beforeEach(async () => {
	await usersDb.clearCollection();
});

afterAll(async () => {
	await infrastructureUserDb.closeDb();
});

describe('makeGetUserByEmail', () => {
	test('when user already created then return user', async () => {
		const addUser = makeAddUser({
			usersDb,
		});

		await addUser({
			email: 'matheus@gmail.com',
			name: 'Matheus Leal',
			password: '12356',
		});

		const getUser = makeGetUserByEmail({
			usersDb,
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
			usersDb,
		});

		await addUser({
			email: 'matheus@gmail.com',
			name: 'Matheus Leal',
			password: '12356',
		});

		const getUser = makeGetUserByEmail({
			usersDb,
		});

		const foundUser = await getUser({
			email: 'matheus2@gmail.com',
		});

		expect(foundUser).toBeNull();
	});

	test('when email is empty then throw error', async () => {
		try {
			const addUser = makeAddUser({
				usersDb,
			});

			await addUser({
				email: 'matheus@gmail.com',
				name: 'Matheus Leal',
				password: '12356',
			});

			const getUser = makeGetUserByEmail({
				usersDb,
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
