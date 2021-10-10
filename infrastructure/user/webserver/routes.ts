import userController from '../../../interfaces/user/controllers';

export default [
  { method: 'POST', path: '/users', handler: userController.postUser },
];
