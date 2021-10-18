import { ObjectId } from 'bson';
import makeUser from '../../domain/user';

const makeGetUserById = ({ usersDb }) => (userInfo: { _id: ObjectId }) => {
	const user = makeUser(userInfo);

	return usersDb.getById({
		_id: user.getId(),
	});
};

export default makeGetUserById;
