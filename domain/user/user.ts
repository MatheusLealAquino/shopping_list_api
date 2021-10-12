interface IUser {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
  isActive?: boolean;
  isAdmin?: boolean;
}

const buildMakeUser = () => ({
  _id,
  email,
  password,
  name,
  isActive = true,
  isAdmin = false,
} : IUser) => Object.freeze({
  getId: () => _id,
  getName: () => name,
  getEmail: () => email,
  getPassword: () => password,
  getIsActive: () => isActive,
  getisAdmin: () => isAdmin,
});

export default buildMakeUser;
