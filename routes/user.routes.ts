import userController from '../controllers/user.controller';

export default [
  { method: 'POST', path: '/users/login', handler: userController.login },
  { method: 'POST', path: '/users/admin/login', handler: userController.adminLogin },
  {
    method: 'GET', path: '/users', handler: userController.getAll, config: { auth: 'adminAuth' },
  },
  {
    method: 'GET', path: '/users/{id}', handler: userController.getById, config: { auth: 'userAuth' },
  },
];
