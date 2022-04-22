import makeUserMongo from './user-mongo';

const userMongo = (connection) => makeUserMongo({
	db: connection,
});

export default {
	userMongo,
};
