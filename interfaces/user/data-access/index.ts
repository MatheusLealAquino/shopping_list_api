import makeUsersDb from './users-db';
import userDb from '../../../infrastructure/user/db';

const usersDb = makeUsersDb({
	makeDb: userDb.makeDb,
});

export default usersDb;
