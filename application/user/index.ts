import usersDb from '../../interfaces/user/data-access';

import makeAddUser from './usecase/add-user/add-user';
import makeGetUserById from './usecase/get-user-byId/get-user-byId';
import makeGetUserByEmail from './usecase/get-user-ByEmail/get-user-byEmail';
import makeGetUserByEmailPassword from
	'./usecase/get-user-byEmailPassword/get-user-byEmailPassword';
import makeAddAdminUser from './usecase/add-admin-user/add-admin-user';
import makeGetUsers from './usecase/get-users/get-users';

const addUser = makeAddUser({ usersDb });
const getUserById = makeGetUserById({ usersDb });
const getUserByEmail = makeGetUserByEmail({ usersDb });
const getUserByEmailPassword = makeGetUserByEmailPassword({ usersDb });
const addAdminUser = makeAddAdminUser({ usersDb });
const getUsers = makeGetUsers({ usersDb });

const userService = Object.freeze({
	addUser,
	getUserById,
	getUserByEmail,
	getUserByEmailPassword,
	addAdminUser,
	getUsers,
});

export default userService;
