import userDataAccess from '../data-access';

import addUser from '../../../application/usecase/add-user/add-user';
import addAdminUser from '../../../application/usecase/add-admin-user/add-admin-user';
import getUserByEmailPassword from
	'../../../application/usecase/get-user-byEmailPassword/get-user-byEmailPassword';
import getUserById from '../../../application/usecase/get-user-byId/get-user-byId';
import getUsers from '../../../application/usecase/get-users/get-users';

import makeAuthenticateUser from './authenticate-user';
import makeGetUserById from './getById-user';
import makePostUser from './post-user';
import makePostAdminUser from './post-admin-user';
import makeAuthenticateAdminUser from './authenticate-admin-user';
import makeGetUsers from './get-users';

const postUser = (userRepository) => (makePostUser({
	addUser: addUser({
		userRepository,
	}),
}));

const postAdminUser = (userRepository) => (makePostAdminUser({
	addAdminUser: addAdminUser({
		userRepository,
	}),
}));

const authenticateUser = (userRepository) => (makeAuthenticateUser({
	getUserByEmailPassword: getUserByEmailPassword({
		userRepository,
	}),
}));

const authenticateAdminUser = (userRepository) => (makeAuthenticateAdminUser({
	getUserByEmailPassword: getUserByEmailPassword({
		userRepository,
	}),
}));

const findUserById = (userRepository) => (makeGetUserById({
	getUserById: getUserById({
		userRepository,
	}),
}));

const getAllUsers = (userRepository) => (makeGetUsers({
	getUsers: getUsers({
		userRepository,
	}),
}));

const userController = (repositoryFactory) => {
	const userRepository = userDataAccess.userMongo(repositoryFactory);

	const postUserMounted = postUser(userRepository);
	const authenticateUserMounted = authenticateUser(userRepository);
	const authenticateAdminUserMounted = authenticateAdminUser(userRepository);
	const findUserByIdMounted = findUserById(userRepository);
	const postAdminUserMounted = postAdminUser(userRepository);
	const getAllUsersMounted = getAllUsers(userRepository);

	return Object.freeze({
		postUser: postUserMounted,
		authenticateUser: authenticateUserMounted,
		authenticateAdminUser: authenticateAdminUserMounted,
		findUserById: findUserByIdMounted,
		postAdminUser: postAdminUserMounted,
		getAllUsers: getAllUsersMounted,
	});
};

export default userController;
