import userService from '../../../application/user';

import makeAuthenticateUser from './authenticate-user';
import makeGetUserById from './getById-user';
import makePostUser from './post-user';
import makePostAdminUser from './post-admin-user';
import makeGetUsers from './get-users';
import makeAuthenticateAdminUser from './authenticate-admin-user';

const postUser = makePostUser({
	addUser: userService.addUser,
});

const postAdminUser = makePostAdminUser({
	addAdminUser: userService.addAdminUser,
});

const authenticateUser = makeAuthenticateUser({
	getUserByEmailPassword: userService.getUserByEmailPassword,
});

const authenticateAdminUser = makeAuthenticateAdminUser({
	getUserByEmailPassword: userService.getUserByEmailPassword,
});

const getUserById = makeGetUserById({
	getUserById: userService.getUserById,
});

const getUsers = makeGetUsers({
	getUsers: userService.getUsers,
});

const userController = Object.freeze({
	postUser,
	authenticateUser,
	authenticateAdminUser,
	getUserById,
	postAdminUser,
	getUsers,
});

export default userController;
