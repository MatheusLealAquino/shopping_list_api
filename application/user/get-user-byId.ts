import makeUser from '../../domain/user';

const makeGetUserById = ({ usersDb }) => (userInfo) => {
  const user = makeUser(userInfo);

  return usersDb.getById({
    id: user.getId(),
  });
};

export default makeGetUserById;
