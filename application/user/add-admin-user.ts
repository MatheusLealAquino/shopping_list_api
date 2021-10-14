import * as bcrypt from 'bcrypt';
import makeUser from '../../domain/user';
import IUser from '../../domain/user/interface';

const makeAddAdminUser = ({ usersDb }) => async (userInfo: IUser) => {
	const user = makeUser(userInfo);

	if (!user.getPassword()) throw new Error('Necessary to receive password');
	if (!user.getEmail()) throw new Error('Necessary to receive email');

	const foundUser = await usersDb.getByEmail({
		email: user.getEmail(),
		isAdmin: true,
	});
	if (foundUser) throw new Error('User already exists');

	const hashedPassword = await bcrypt.hash(user.getPassword() as string, 10);

	return usersDb.insert({
		email: user.getEmail(),
		password: hashedPassword,
		name: user.getName(),
		isActive: user.getIsActive(),
		isAdmin: true,
	});
};

export default makeAddAdminUser;
