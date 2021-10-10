import makeUser from '../../domain/user';

const makeAddUser = ({ usersDb }) => (userInfo) => {
  const user = makeUser(userInfo);

  return usersDb.insert({
    email: user.getEmail(),
    password: user.getPassword(),
    name: user.getName(),
  });
};

export default makeAddUser;
