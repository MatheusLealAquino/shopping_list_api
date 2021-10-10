import buildMakeUser from './user';
import validator from '../../infrastructure/user/validator';

const makeUser = buildMakeUser({
  validator,
});

export default makeUser;
