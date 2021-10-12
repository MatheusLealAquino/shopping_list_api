import * as bcrypt from 'bcrypt';
import makeUser from '../../domain/user';

const makeGetUserByEmailPassword = ({ usersDb }) => async (userInfo) => {
  const user = makeUser(userInfo);

  const foundUser = await usersDb.getByEmail({
    email: user.getEmail(),
  });
  if (!foundUser) throw new Error('User not found');

  const password = user.getPassword() || '';

  return (await bcrypt.compare(password, foundUser.password))
    ? foundUser : null;
};

export default makeGetUserByEmailPassword;
