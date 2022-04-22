import userDataAccess from '../data-access';
import mongoConnectionAdapter from '../../../infrastructure/db/mongoConnectionAdapter';

import addUser from '../../../application/usecase/add-user/add-user';

import userController from './index';

let userControllerMounted;
let addUserMounted;
let userRepository;
beforeAll(async () => {
	const connection = await mongoConnectionAdapter.makeDb();
	userRepository = userDataAccess.userMongo(connection);

	addUserMounted = addUser({
		userRepository,
	});
	userControllerMounted = userController(connection);
});

beforeEach(async () => {
	await userRepository.clearCollection();
});

afterAll(async () => {
	await mongoConnectionAdapter.closeDb();
});

const defaultHttpResponse = {
	response: (data) => ({
		code: (status) => ({
			status,
			data,
		}),
	}),
};

test('when find user then return 200 and get token', async () => {
	const payload = {
		email: 'matheus@gmail.com',
		password: '123456',
	};

	await addUserMounted({
		email: 'matheus@gmail.com',
		password: '123456',
	});

	const res = await userControllerMounted.authenticateUser({ payload }, defaultHttpResponse);

	expect(res.status).toBe(200);
	expect(res.data.token).toBeDefined();
});

test('when dont find user then return 404 and user not found', async () => {
	const payload = {
		email: 'matheus@gmail.com',
		password: '123456',
	};

	const res = await userControllerMounted.authenticateUser({ payload }, defaultHttpResponse);

	expect(res.status).toBe(404);
	expect(res.data.error).toBe('user not found');
});

test('when dont receive email then return 400 and missing email data', async () => {
	const payload = {
		password: '123456',
	};

	const res = await userControllerMounted.authenticateUser({ payload }, defaultHttpResponse);

	expect(res.status).toBe(400);
	expect(res.data.error).toBe('missing email data');
});

test('when dont receive password then return 400 and missing password data', async () => {
	const payload = {
		email: 'matheus@gmail.com',
	};

	const res = await userControllerMounted.authenticateUser({ payload }, defaultHttpResponse);

	expect(res.status).toBe(400);
	expect(res.data.error).toBe('missing password data');
});
