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
    method: 'GET',
    path: '/users/{_id}',
    handler: userController.getUserById,
    // config: { auth: 'userAuth' },
  },
];
