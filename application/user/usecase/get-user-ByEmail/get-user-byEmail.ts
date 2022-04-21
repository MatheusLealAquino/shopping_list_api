import makeUser from '../../../../domain/user';

const makeGetUserByEmail = ({ usersDb }) => (userInfo: { email: string }) => {
	if (!userInfo.email) throw new Error('Necessary to receive email');

	const user = makeUser(userInfo);

	return usersDb.getByEmail({
		email: user.getEmail(),
	});
};

export default makeGetUserByEmail;
