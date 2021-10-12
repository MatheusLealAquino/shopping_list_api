import * as bcrypt from 'bcrypt';
import makeUser from '../../domain/user';

const makeAddAdminUser = ({ usersDb }) => async (userInfo) => {
  const user = makeUser(userInfo);

  const foundUser = await usersDb.getByEmail({
    email: user.getEmail(),
    isAdmin: true,
  });
  if (foundUser) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(user.getPassword() as string, 10);

  return usersDb.insert({
    email: user.getEmail(),
    password: hashedPassword,
    name: user.getName(),
    isActive: user.getIsActive(),
    isAdmin: true,
  });
};

export default makeAddAdminUser;
