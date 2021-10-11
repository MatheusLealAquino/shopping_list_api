interface IUser {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
  isActive?: string;
}

const buildMakeUser = () => ({
  _id,
  email,
  password,
  name,
} : IUser) => Object.freeze({
  getId: () => _id,
  getName: () => name,
  getEmail: () => email,
  getPassword: () => password,
});

export default buildMakeUser;
