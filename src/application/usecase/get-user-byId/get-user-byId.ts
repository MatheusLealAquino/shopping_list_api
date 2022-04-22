import { ObjectId } from 'bson';
import makeUser from '../../../domain/user';

const makeGetUserById = ({ userRepository }) => (userInfo: { _id: ObjectId }) => {
	const user = makeUser(userInfo);

	return userRepository.getById({
		_id: user.getId(),
	});
};

export default makeGetUserById;
