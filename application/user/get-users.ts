const makeGetUserByEmail = ({ usersDb }) => async () => {
  const users = await usersDb.getUsers();
  return users.map((el) => ({
    id: el._id,
    email: el.email,
    name: el.name,
    isActive: el.active,
    isAdmin: el.isAdmin,
  }));
};

export default makeGetUserByEmail;
