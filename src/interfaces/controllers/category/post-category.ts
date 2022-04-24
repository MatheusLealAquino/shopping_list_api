const makePostCategory = ({ addCategory }) => async (request: any, h: any) => {
	try {
		const { name, icon } = request.payload;
		if (!name) {
			return h.response({
				error: 'missing name data',
			}).code(400);
		}

		const category = await addCategory({
			name,
		});

		return h.response({
			id: category._id,
			name,
			icon,
		}).code(201);
	} catch (e) {
		const error = e as Error;

		return h.response({
			error: error.message,
		}).code(500);
	}
};

export default makePostCategory;
