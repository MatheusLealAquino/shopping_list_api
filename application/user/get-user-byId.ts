import makeUser from '../../domain/user';

const makeGetUserById = ({ usersDb }) => (userInfo) => {
  const user = makeUser(userInfo);

  return usersDb.getById({
    _id: user.getId(),
  });
};

export default makeGetUserById;
