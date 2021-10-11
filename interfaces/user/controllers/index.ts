import userService from '../../../application/user';

import authenticateUser from './authenticate-user';
import makeGetUserById from './getById-user';
import makePostUser from './post-user';

const postUser = makePostUser({
  addUser: userService.addUser,
});

const authenticateUserController = authenticateUser({
  getUserByEmailPassword: userService.getUserByEmailPassword,
});

const getUserById = makeGetUserById({
  getUserById: userService.getUserById,
});

const userController = Object.freeze({
  postUser,
  authenticateUser: authenticateUserController,
  getUserById,
});

export default userController;
