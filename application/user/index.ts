import usersDb from '../../interfaces/user/data-access';

import makeAddUser from './add-user';
import makeGetUserById from './get-user-byId';
import makeGetUserByEmail from './get-user-byEmail';
import makeGetUserByEmailPassword from './get-user-byEmailPassword';
import makeAddAdminUser from './add-admin-user';
import makeGetUsers from './get-users';

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
