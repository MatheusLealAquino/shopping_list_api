import usersDb from '../../interfaces/user/data-access';

import makeAddUser from './add-user';
import makeGetUserById from './get-user-byId';
import makeGetUserByEmail from './get-user-byEmail';
import makeGetUserByEmailPassword from './get-user-byEmailPassword';

const addUser = makeAddUser({ usersDb });
const getUserById = makeGetUserById({ usersDb });
const getUserByEmail = makeGetUserByEmail({ usersDb });
const getUserByEmailPassword = makeGetUserByEmailPassword({ usersDb });

const userService = Object.freeze({
  addUser,
  getUserById,
  getUserByEmail,
  getUserByEmailPassword,
});

export default userService;
