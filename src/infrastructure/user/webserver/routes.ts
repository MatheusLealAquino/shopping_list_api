import userController from '../../../interfaces/user/controllers';

export default [
	{
		method: 'POST',
		path: '/users',
		handler: userController.postUser,
	},
	{
		method: 'POST',
		path: '/users/login',
		handler: userController.authenticateUser,
	},
	{
		method: 'POST',
		path: '/users/admin',
		handler: userController.postAdminUser,
	},
	{
		method: 'POST',
		path: '/users/admin/login',
		handler: userController.authenticateAdminUser,
	},
	{
		method: 'GET',
		path: '/users/{_id}',
		handler: userController.getUserById,
		config: { auth: 'userAuth' },
	},
	{
		method: 'GET',
		path: '/users',
		handler: userController.getUsers,
		config: { auth: 'adminAuth' },
	},
];
