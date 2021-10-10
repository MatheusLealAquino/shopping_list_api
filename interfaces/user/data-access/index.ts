import makeUsersDb from './users-db';
import makeDb from '../../../infrastructure/user/db';

const usersDb = makeUsersDb({
  makeDb,
});

export default usersDb;
