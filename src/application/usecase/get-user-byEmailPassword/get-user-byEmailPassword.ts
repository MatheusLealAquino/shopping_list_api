import * as bcrypt from 'bcrypt';
import makeUser from '../../../domain/user';

const makeGetUserByEmailPassword = ({ userRepository }) => async (userInfo) => {
	const user = makeUser(userInfo);

	const foundUser = await userRepository.getByEmail({
		email: user.getEmail(),
	});
	if (!foundUser) return null;

	const password = user.getPassword() || '';

	return (await bcrypt.compare(password, foundUser.password))
		? foundUser : null;
};

export default makeGetUserByEmailPassword;
