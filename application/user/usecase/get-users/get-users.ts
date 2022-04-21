const makeGetUsers = ({ usersDb }) => async () => {
	const users = await usersDb.getUsers();

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
