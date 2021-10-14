import makeUser from '../../domain/user';

const makeGetUserByEmail = ({ usersDb }) => (userInfo) => {
	const user = makeUser(userInfo);

	return usersDb.getByEmail({
		email: user.getEmail(),
	});
};

export default makeGetUserByEmail;
