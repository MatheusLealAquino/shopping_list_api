const makePostUser = ({ addUser }) => async (request: any, h: any) => {
	try {
		const { email, password, name } = request.payload;
		if (!email) {
			return h.response({
				error: 'missing email data',
			}).code(400);
		}

		if (!password) {
			return h.response({
				error: 'missing password data',
			}).code(400);
		}

		if (!name) {
			return h.response({
				error: 'missing name data',
			}).code(400);
		}

		const user = await addUser({
			email,
			password,
			name,
		});

		return h.response({
			id: user._id,
			email: user.email,
			name,
		}).code(201);
	} catch (e) {
		const error = e as Error;

		if (error.message === 'User already exists') {
			return h.response({
				error: error.message,
			}).code(400);
		}

		return h.response({
			error: error.message,
		}).code(500);
	}
};

export default makePostUser;
