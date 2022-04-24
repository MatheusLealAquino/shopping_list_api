const makeGetUsers = ({ getUsers }) => async (request: any, h: any) => {
	try {
		const users = await getUsers();

		return h.response({
			total: users.length,
			data: users,
		}).code(200);
	} catch (e) {
		const error = e as Error;

		return h.response({
			error: error.message,
		}).code(500);
	}
};

export default makeGetUsers;
