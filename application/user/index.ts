import makeAddUser from './add-user';
import makeGetUserById from './get-user-byId';

import usersDb from '../../interfaces/user/data-access';

const addUser = makeAddUser({ usersDb });
const getUserById = makeGetUserById({ usersDb });

const userService = Object.freeze({
  addUser,
  getUserById,
});

export default userService;
