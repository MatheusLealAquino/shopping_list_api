import userController from '../../../interfaces/user/controllers';

export default (connection) => {
	const userControllerWithConnection = userController(connection);

	return [
		{
			method: 'POST',
			path: '/users',
			handler: userControllerWithConnection.postUser,
		},
		{
			method: 'POST',
			path: '/users/login',
			handler: userControllerWithConnection.authenticateUser,
		},
		{
			method: 'POST',
			path: '/users/admin',
			handler: userControllerWithConnection.postAdminUser,
		},
		{
			method: 'POST',
			path: '/users/admin/login',
			handler: userControllerWithConnection.authenticateAdminUser,
		},
		{
			method: 'GET',
			path: '/users/{_id}',
			handler: userControllerWithConnection.findUserById,
			config: { auth: 'userAuth' },
		},
		{
			method: 'GET',
			path: '/users',
			handler: userControllerWithConnection.getAllUsers,
			config: { auth: 'adminAuth' },
		},
	];
};
