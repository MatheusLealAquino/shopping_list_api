import jwt from 'jsonwebtoken';

const makeAuthenticateAdminUser = ({ getUserByEmailPassword }) => async (request: any, h: any) => {
	try {
		const { email, password } = request.payload;
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

		const user = await getUserByEmailPassword({
			email,
			password,
		});

		if (!user || !user.isAdmin) {
			return h.response({
				error: 'user not found',
			}).code(404);
		}

		return h.response({
			token: jwt.sign({
				_id: user._id,
				email: user.email,
				name: user.name,
				isAdmin: user.isAdmin,
			}, process.env.JWT_SECRET_ADMIN as string),
		}).code(200);
	} catch (e) {
		const error = e as Error;

		if (error.message === 'User not found') {
			return h.response({
				error: error.message,
			}).code(400);
		}

		return h.response({
			error: error.message,
		}).code(500);
	}
};

export default makeAuthenticateAdminUser;
