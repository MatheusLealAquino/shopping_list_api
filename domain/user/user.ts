interface IUser {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
}

const buildMakeUser = ({ validator }) => ({
  id,
  email,
  password,
  name,
} : IUser) => {
  const { error } = validator({
    id, email, password, name,
  });
  if (error) throw new Error(error);

  return Object.freeze({
    getId: () => id,
    getName: () => name,
    getEmail: () => email,
    getPassword: () => password,
  });
};

export default buildMakeUser;
