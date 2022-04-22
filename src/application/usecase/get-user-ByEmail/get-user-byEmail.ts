import makeUser from '../../../domain/user';

const makeGetUserByEmail = ({ userRepository }) => (userInfo: { email: string }) => {
	if (!userInfo.email) throw new Error('Necessary to receive email');

	const user = makeUser(userInfo);

	return userRepository.getByEmail({
		email: user.getEmail(),
	});
};

export default makeGetUserByEmail;
