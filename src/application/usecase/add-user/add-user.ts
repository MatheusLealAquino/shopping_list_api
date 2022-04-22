import * as bcrypt from 'bcrypt';
import makeUser from '../../../domain/user';
import IUser from '../../../domain/user/interface';

const makeAddUser = ({ userRepository }) => async (userInfo: IUser) => {
	const user = makeUser(userInfo);

	if (!user.getPassword()) throw new Error('Necessary to receive password');
	if (!user.getEmail()) throw new Error('Necessary to receive email');

	const foundUser = await userRepository.getByEmail({
		email: user.getEmail(),
	});
	if (foundUser) throw new Error('User already exists');

	const hashedPassword = await bcrypt.hash(user.getPassword() as string, 10);

	return userRepository.insert({
		email: user.getEmail(),
		password: hashedPassword,
		name: user.getName(),
		isActive: user.getIsActive(),
		isAdmin: user.getIsAdmin(),
	});
};

export default makeAddUser;
