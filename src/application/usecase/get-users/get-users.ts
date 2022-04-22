const makeGetUsers = ({ userRepository }) => async () => {
	const users = await userRepository.getUsers();

	return users.map((el) => ({
		_id: el._id,
		email: el.email,
		name: el.name,
		isActive: el.isActive,
		isAdmin: el.isAdmin,
		createdAt: el.createdAt,
	}));
};

export default makeGetUsers;
