import userController from '../../../interfaces/controllers/user';

export default (connection) => {
	const userControllerWithConnection = userController(connection);

	return [
		{
			method: 'POST',
			path: '/user',
			handler: userControllerWithConnection.postUser,
		},
		{
			method: 'POST',
			path: '/user/login',
			handler: userControllerWithConnection.authenticateUser,
		},
		{
			method: 'POST',
			path: '/user/admin',
			handler: userControllerWithConnection.postAdminUser,
		},
		{
			method: 'POST',
			path: '/user/admin/login',
			handler: userControllerWithConnection.authenticateAdminUser,
		},
		{
			method: 'GET',
			path: '/user/{_id}',
			handler: userControllerWithConnection.findUserById,
			config: { auth: 'userAuth' },
		},
		{
			method: 'GET',
			path: '/user',
			handler: userControllerWithConnection.getAllUsers,
			config: { auth: 'adminAuth' },
		},
	];
};
