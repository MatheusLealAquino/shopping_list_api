import makeCategoryMongo from './category-mongo';
import makeUserMongo from './user-mongo';

const userMongo = (connection) => makeUserMongo({
	db: connection,
});

const categoryMongo = (connection) => makeCategoryMongo({
	db: connection,
});

export default {
	userMongo,
	categoryMongo,
};
